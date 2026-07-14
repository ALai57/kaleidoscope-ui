# Backend Rename-URL Support — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let `PUT /recipes/:recipe-url` change a recipe's slug (its public address) while keeping the recipe's identity and history, rejecting collisions with a 409.

**Architecture:** `recipe_url` is the address, `id` (UUID) is identity — the DB already enforces `UNIQUE (recipe_url, hostname)`. We add an optional `:recipe-url` to the update schema, teach `update-recipe!` to set it (and re-fetch by the *new* slug so the response isn't `nil`), pre-check for an in-tenant collision, and map that collision to a 409 in the HTTP layer.

**Tech Stack:** Clojure, reitit, malli schemas, next.jdbc, embedded-postgres tests, `matcher-combinators` (`match?`).

## Global Constraints

- Repo root for every path in this plan: `../kaleidoscope` (the Clojure API), **not** the UI repo.
- `recipe_url` is unique per `(recipe_url, hostname)` — migration `resources/migrations/20260711000001-add-recipes.up.sql:19`.
- Tenancy: every query is scoped by `hostname` (from the `Host` header via `hu/get-host`).
- Tests use `embedded-pg/fresh-db!` and `matcher-combinators.test` `match?`; mirror the existing style in `test/kaleidoscope/api/recipes_test.clj`.
- Run backend tests with the project's task runner (`task test` or `clojure -M:test`, per repo README).

---

### Task 1: Accept `:recipe-url` on the update schema

**Files:**
- Modify: `src/kaleidoscope/models/recipes.cljc:85-90` (`UpdateRecipeRequest`)
- Test: `test/kaleidoscope/models/recipes_test.clj` (schema validation)

**Interfaces:**
- Produces: `UpdateRecipeRequest` now permits an optional `[:recipe-url :string]` key.

- [ ] **Step 1: Write the failing test**

In `test/kaleidoscope/models/recipes_test.clj`, add (mirror the file's existing `deftest` + `malli.core` usage; if the ns doesn't already require malli, add `[malli.core :as m]`):

```clojure
(deftest update-recipe-request-accepts-recipe-url
  (is (m/validate models.recipes/UpdateRecipeRequest {:recipe-url "new-slug"}))
  (is (m/validate models.recipes/UpdateRecipeRequest {}))               ; still fully optional
  (is (not (m/validate models.recipes/UpdateRecipeRequest {:recipe-url 42}))))
```

- [ ] **Step 2: Run test to verify it fails**

Run: `clojure -M:test -n kaleidoscope.models.recipes-test`
Expected: FAIL — `{:recipe-url "new-slug"}` currently validates because the map is open, but `{:recipe-url 42}` also validates (no `:recipe-url` key constrains it). The `42` assertion fails.

- [ ] **Step 3: Add the key to the schema**

`src/kaleidoscope/models/recipes.cljc`:

```clojure
(def UpdateRecipeRequest
  [:map
   [:content           {:optional true} RecipeContent]
   [:recipe-url        {:optional true} :string]
   [:source-url        {:optional true} [:maybe :string]]
   [:label-ids         {:optional true} [:sequential :uuid]]
   [:public-visibility {:optional true} :boolean]])
```

- [ ] **Step 4: Run test to verify it passes**

Run: `clojure -M:test -n kaleidoscope.models.recipes-test`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add src/kaleidoscope/models/recipes.cljc test/kaleidoscope/models/recipes_test.clj
git commit -m "feat(recipes): accept optional recipe-url on UpdateRecipeRequest"
```

---

### Task 2: `update-recipe!` sets the new slug and returns by it

**Files:**
- Modify: `src/kaleidoscope/api/recipes.clj:295-315` (`update-recipe!`)
- Test: `test/kaleidoscope/api/recipes_test.clj`

**Interfaces:**
- Consumes: `get-recipe`, `validate-label-set!`, `replace-label-assignments!`, `rdbms/scoped-update!`, `utils/now` (all already in this ns).
- Produces: `update-recipe!` renames the slug when `:recipe-url` is present in the patch and returns the updated recipe fetched by its **new** slug.

- [ ] **Step 1: Write the failing test**

Add to `test/kaleidoscope/api/recipes_test.clj` (uses the file's existing `host`, `example-recipe`, `embedded-pg`):

```clojure
(deftest rename-recipe-url-test
  (let [db (embedded-pg/fresh-db!)]
    (recipes/create-recipe! db (example-recipe))
    (testing "renaming the slug returns the recipe at its new address"
      (is (match? {:recipe-url "chana-masala-v2" :content example-content}
                  (recipes/update-recipe! db host "chana-masala" {:recipe-url "chana-masala-v2"}))))
    (testing "old slug no longer resolves; new one does; identity is preserved"
      (is (nil? (recipes/get-recipe db host "chana-masala")))
      (is (match? {:recipe-url "chana-masala-v2"} (recipes/get-recipe db host "chana-masala-v2"))))))
```

- [ ] **Step 2: Run test to verify it fails**

Run: `clojure -M:test -n kaleidoscope.api.recipes-test`
Expected: FAIL — `update-recipe!` ignores `:recipe-url`, so the slug is unchanged and the return is fetched by the old slug.

- [ ] **Step 3: Implement**

Replace `update-recipe!` in `src/kaleidoscope/api/recipes.clj`. Note the destructure binds the patch's `:recipe-url` to `new-url` to avoid colliding with the `recipe-url` path argument, and `effective-url` chooses which slug to re-fetch by:

```clojure
(defn update-recipe!
  "Update a recipe's editable fields (content, recipe-url, source-url, visibility)
  and its label set, scoped to hostname. Never touches `:original-content`.
  Renaming `:recipe-url` changes the address, not identity. Returns nil if no
  recipe with that slug exists for the tenant."
  [db hostname recipe-url {:keys [content source-url public-visibility label-ids]
                           new-url :recipe-url :as patch}]
  (log/infof "Updating recipe %s for %s" recipe-url hostname)
  (next/with-transaction [tx db]
    (if-let [{:keys [id]} (get-recipe tx hostname recipe-url)]
      (let [labels        (validate-label-set! tx label-ids hostname)
            effective-url (if (contains? patch :recipe-url) new-url recipe-url)
            set-map       (cond-> {:modified-at (utils/now)}
                            (contains? patch :content)           (assoc :content content)
                            (contains? patch :recipe-url)        (assoc :recipe-url new-url)
                            (contains? patch :source-url)        (assoc :source-url source-url)
                            (contains? patch :public-visibility) (assoc :public-visibility (boolean public-visibility)))]
        (rdbms/scoped-update! tx :recipes {:id id :hostname hostname} set-map)
        (when (contains? patch :label-ids)
          (replace-label-assignments! tx id hostname labels))
        (get-recipe tx hostname effective-url))
      (do (log/warnf "No recipe %s for %s" recipe-url hostname)
          nil))))
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `clojure -M:test -n kaleidoscope.api.recipes-test`
Expected: PASS (`rename-recipe-url-test` green; `original-content-is-immutable-test` and the rest still green — a no-`:recipe-url` patch keeps `effective-url` = the path slug).

- [ ] **Step 5: Commit**

```bash
git add src/kaleidoscope/api/recipes.clj test/kaleidoscope/api/recipes_test.clj
git commit -m "feat(recipes): update-recipe! renames slug and returns by new address"
```

---

### Task 3: Reject slug collisions with a 409

**Files:**
- Modify: `src/kaleidoscope/api/recipes.clj` (`update-recipe!` — add the pre-check)
- Modify: `src/kaleidoscope/http_api/recipes.clj:8` (require `conflict`) and `:23-36` (`handle-write`)
- Test: `test/kaleidoscope/api/recipes_test.clj` (collision throws) and `test/kaleidoscope/http_api/recipes_test.clj` (handler returns 409)

**Interfaces:**
- Consumes: `handle-write` already wraps the PUT handler.
- Produces: renaming to a slug used by *another* recipe in the same tenant throws `ex-info` `{:type :conflict}`, which `handle-write` maps to HTTP 409.

- [ ] **Step 1: Write the failing API test**

Add to `test/kaleidoscope/api/recipes_test.clj`:

```clojure
(deftest rename-to-existing-slug-conflicts-test
  (let [db (embedded-pg/fresh-db!)]
    (recipes/create-recipe! db (example-recipe :recipe-url "chana-masala"))
    (recipes/create-recipe! db (example-recipe :recipe-url "pad-thai"))
    (testing "renaming onto another recipe's slug throws a :conflict"
      (is (thrown-match? clojure.lang.ExceptionInfo
                         {:type :conflict}
                         (recipes/update-recipe! db host "chana-masala" {:recipe-url "pad-thai"}))))
    (testing "renaming a slug to itself is allowed (no-op collision)"
      (is (match? {:recipe-url "chana-masala"}
                  (recipes/update-recipe! db host "chana-masala" {:recipe-url "chana-masala"}))))))
```

(If `thrown-match?` isn't already referred in the ns, add `[matcher-combinators.test :refer [match? thrown-match?]]`.)

- [ ] **Step 2: Run test to verify it fails**

Run: `clojure -M:test -n kaleidoscope.api.recipes-test`
Expected: FAIL — no collision check exists; the DB `UNIQUE` constraint throws a raw `PSQLException` (not `ExceptionInfo` with `:type :conflict`), so `thrown-match?` fails.

- [ ] **Step 3: Add the in-transaction pre-check**

In `update-recipe!`, immediately after the `if-let [{:keys [id]} ...]` binds an existing recipe and before building `set-map`, insert:

```clojure
            _ (when (and (contains? patch :recipe-url)
                         (not= new-url recipe-url)
                         (get-recipe tx hostname new-url))
                (throw (ex-info (format "URL '%s' is already in use" new-url)
                                {:type :conflict :reason :slug-taken})))
```

(Place it as the first binding inside the `let`, before `labels`. The `(not= new-url recipe-url)` guard makes renaming a slug to itself a no-op rather than a self-collision.)

- [ ] **Step 4: Run the API test to verify it passes**

Run: `clojure -M:test -n kaleidoscope.api.recipes-test`
Expected: PASS

- [ ] **Step 5: Map `:conflict` → 409 in the HTTP layer**

`src/kaleidoscope/http_api/recipes.clj` — add `conflict` to the ring require:

```clojure
[ring.util.http-response :refer [bad-request conflict not-found ok unprocessable-entity]]
```

Replace `handle-write`:

```clojure
(defn- handle-write
  "Run a recipe write, turning validation failures (one-per-group, unknown
  label) into a 400 and slug collisions into a 409 rather than a 500."
  [f]
  (try
    (let [result (f)]
      (if result (ok result) (not-found {:reason "Missing"})))
    (catch clojure.lang.ExceptionInfo e
      (case (:type (ex-data e))
        :validation (bad-request {:error (ex-message e)})
        :conflict   (conflict {:error (ex-message e)})
        (throw e)))))
```

- [ ] **Step 6: Write the failing HTTP test**

Add to `test/kaleidoscope/http_api/recipes_test.clj`, mirroring an existing PUT/handler test in that file (reuse its app/request fixtures — grep for an existing `:request-method :put` recipe test and copy its setup). The assertion:

```clojure
(deftest put-recipe-slug-collision-returns-409
  ;; ...create two recipes "chana-masala" and "pad-thai" for the tenant via the same
  ;; fixtures the other PUT tests use...
  (let [response (app (-> (mock/request :put "/recipes/chana-masala")
                          (mock/json-body {:recipe-url "pad-thai"})
                          (assoc :headers {"host" "andrewslai.com"})
                          writer-auth))]   ; same auth helper the other write tests use
    (is (= 409 (:status response)))))
```

- [ ] **Step 7: Run the HTTP test to verify it passes**

Run: `clojure -M:test -n kaleidoscope.http-api.recipes-test`
Expected: PASS

- [ ] **Step 8: Commit**

```bash
git add src/kaleidoscope/api/recipes.clj src/kaleidoscope/http_api/recipes.clj \
        test/kaleidoscope/api/recipes_test.clj test/kaleidoscope/http_api/recipes_test.clj
git commit -m "feat(recipes): reject slug rename collisions with 409"
```

---

### Task 4: Full backend suite green

- [ ] **Step 1: Run the whole recipe suite**

Run: `clojure -M:test -n kaleidoscope.api.recipes-test -n kaleidoscope.http-api.recipes-test -n kaleidoscope.models.recipes-test`
Expected: all PASS.

- [ ] **Step 2: Run the project's full check (whatever the repo README specifies, e.g. `task test`)**

Expected: no regressions.

## Self-Review Notes

- **Return-nil bug** addressed by `effective-url` (Task 2) — the classic "renamed then fetched by the stale slug" trap.
- **Destructure collision** (path `recipe-url` vs patch `:recipe-url`) addressed via the `new-url :recipe-url` alias (Task 2).
- **Self-rename** (slug → same slug) is a no-op, not a 409 (Task 3, `not=` guard).
- Out of scope: server-side slug format normalization. The frontend slugifies before sending (Plan 3); the DB accepts any non-empty string. If you want a server guard, add a `->slug` normalization + non-empty check as a follow-up — not required for this plan.
