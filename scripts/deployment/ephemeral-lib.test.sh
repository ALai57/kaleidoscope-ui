#!/usr/bin/env bash
# Unit tests for the pure helpers in ephemeral-lib.sh — no services needed.
#
#   bash scripts/deployment/ephemeral-lib.test.sh
#
# Focus: derive_slug must be deterministic + idempotent and parse_ephemeral_slugs
# must extract exactly the kal-eph-* slugs, since this script and the backend's
# deploy-app each derive the slug/prefix independently and MUST agree (a mismatch
# ships the SPA where the backend can't find it → '/' 404s).
set -uo pipefail
source "$(dirname -- "${BASH_SOURCE[0]}")/ephemeral-lib.sh"

fails=0
check() { # check <description> <expected> <actual>
  if [ "$2" = "$3" ]; then
    printf '  ok: %s\n' "$1"
  else
    printf '  FAIL: %s\n    expected: %q\n    actual:   %q\n' "$1" "$2" "$3"
    fails=$((fails + 1))
  fi
}

# --- derive_slug -------------------------------------------------------------
check "lowercases and dashes non-alnum" "recipes-feature" "$(derive_slug 'Recipes/Feature')"
check "collapses runs and trims ends"   "a-b"             "$(derive_slug '  --A__B!! ')"
check "empty input yields empty slug"   ""                "$(derive_slug '')"

check "truncates to the cap"       "plans-recipes-feature" "$(SLUG_MAX_LEN=21 derive_slug 'plans/recipes-feature-extra' 2>/dev/null)"
check "trims dash left by the cut" "ab"                    "$(SLUG_MAX_LEN=3 derive_slug 'ab-cd' 2>/dev/null)"

first="$(derive_slug 'plans/recipes-feature')"
check "derive is idempotent" "$first" "$(derive_slug "$first")"

warn_out="$(SLUG_MAX_LEN=5 derive_slug 'this-is-a-long-branch-name' 2>&1 >/dev/null)"
case "$warn_out" in
  *truncated*) printf '  ok: %s\n' "warns on truncation" ;;
  *) printf '  FAIL: %s\n    expected a truncation warning, got: %q\n' "warns on truncation" "$warn_out"; fails=$((fails + 1)) ;;
esac

# --- s3_prefix ---------------------------------------------------------------
check "s3_prefix wraps the slug" "eph-pr-42/" "$(s3_prefix 'pr-42')"

# --- parse_name_flag ---------------------------------------------------------
check "--name wins over other args" "pr-42" "$(parse_name_flag --foo --name=pr-42 bar)"
check "no --name yields empty"      ""      "$(parse_name_flag --foo bar)"

# --- parse_ephemeral_slugs ---------------------------------------------------
require_cmd jq
apps_json='[
  {"Name":"kal-eph-pr-42"},
  {"Name":"kal-eph-recipes"},
  {"Name":"kaleidoscope"},
  {"Name":"kal-ephemeral"}
]'
check "extracts kal-eph-* slugs only" \
  "$(printf 'pr-42\nrecipes')" \
  "$(printf '%s' "$apps_json" | parse_ephemeral_slugs)"
check "empty app list yields no slugs" "" "$(printf '[]' | parse_ephemeral_slugs)"

# -----------------------------------------------------------------------------
if [ "$fails" -eq 0 ]; then
  printf '\nAll ephemeral-lib tests passed.\n'
else
  printf '\n%d test(s) FAILED.\n' "$fails"
  exit 1
fi
