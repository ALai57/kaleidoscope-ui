#!/usr/bin/env bash
# Frontend-owned helpers for deploying this SPA to an ephemeral Fly.io env.
# Sourced by deploy-ephemeral (and exercised by ephemeral-lib.test.sh).
#
# An ephemeral env is identified by a short SLUG. The resource names derive from
# it — a CONTRACT shared with the backend (../kaleidoscope/scripts/ephemeral),
# documented in both repos but not shared code (the repos stay independent):
#   Fly app     kal-eph-<slug>
#   S3 bucket   kal-ephemeral
#   S3 prefix   eph-<slug>/     (the backend's deploy-app sets
#                                KALEIDOSCOPE_CLIENT_PREFIX=eph-<slug>/, so the
#                                SPA MUST land here or '/' 404s)
# Slug derivation is therefore deterministic + idempotent so both repos agree.

# --- logging -----------------------------------------------------------------
log()  { printf '\033[1;34m==>\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33mWARN:\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31mERROR:\033[0m %s\n' "$*" >&2; exit 1; }

require_cmd() { command -v "$1" >/dev/null 2>&1 || die "Required command not found on PATH: $1"; }

EPHEMERAL_BUCKET="${EPHEMERAL_BUCKET:-kal-ephemeral}"

# --- slug + naming (must match ../kaleidoscope/scripts/ephemeral/lib.sh) ------
# Normalize a raw name into a slug: lowercase, non-alnum collapsed to '-',
# trimmed, capped at SLUG_MAX_LEN. Idempotent. Warns loudly on truncation since
# a silently renamed slug is how the frontend and backend once ended up pointing
# at different S3 prefixes — the fix is always an explicit --name=<slug>.
SLUG_MAX_LEN="${SLUG_MAX_LEN:-30}"
derive_slug() {
  local raw="${1:-}"
  [ -n "$raw" ] || return 0
  local normalized slug
  normalized="$(printf '%s' "$raw" \
    | tr '[:upper:]' '[:lower:]' \
    | sed -E 's/[^a-z0-9]+/-/g; s/^-+//; s/-+$//')"
  slug="$(printf '%s' "$normalized" | cut -c1-"$SLUG_MAX_LEN" | sed -E 's/-+$//')"
  if [ "$slug" != "$normalized" ]; then
    warn "Slug '$normalized' truncated to '$slug' (max $SLUG_MAX_LEN chars) — pass --name=<slug> to control it."
  fi
  printf '%s' "$slug"
}

s3_prefix() { printf 'eph-%s/' "$1"; }

# Pull --name=<slug> out of an argument list; echoes the value (possibly empty).
parse_name_flag() {
  local name="" arg
  for arg in "$@"; do
    case "$arg" in
      --name=*) name="${arg#*=}" ;;
    esac
  done
  printf '%s' "$name"
}

# --- ephemeral app discovery -------------------------------------------------
# Turn `fly apps list --json` (on stdin) into the slug of every kal-eph-* app,
# one per line. Pure (no fly/network) so it's unit-testable against fixtures.
# The trailing dash in the prefix keeps a stray `kal-ephemeral`-style name out.
parse_ephemeral_slugs() {
  jq -r '.[].Name | select(startswith("kal-eph-")) | ltrimstr("kal-eph-")'
}

# All deployed ephemeral env slugs, discovered from Fly, one per line.
list_ephemeral_slugs() {
  require_cmd fly
  require_cmd jq
  fly apps list --json | parse_ephemeral_slugs
}

# Interactively choose an ephemeral slug from the deployed kal-eph-* Fly apps.
# The chosen slug is the only thing printed to stdout (so `$(...)` capture is
# clean); every prompt, warning, and the numbered menu go to stderr. Dies with
# an actionable message when there's nothing to pick or no TTY to prompt on.
select_ephemeral_slug() {
  local slugs
  slugs="$(list_ephemeral_slugs)" || die "Could not list Fly apps — is 'fly' authenticated (fly auth login)?"
  [ -n "$slugs" ] || die "No ephemeral Fly apps (kal-eph-*) found. Deploy one first (backend: task ephemeral:up NAME=<slug>)."

  local -a options=()
  local line
  while IFS= read -r line; do
    [ -n "$line" ] && options+=("$line")
  done <<< "$slugs"

  if [ "${#options[@]}" -eq 1 ]; then
    warn "Only one ephemeral env found ('${options[0]}'); using it."
    printf '%s' "${options[0]}"
    return 0
  fi

  [ -t 0 ] || die "No --name given and stdin is not a TTY — pass --name=<slug> to select non-interactively."

  warn "No --name given. Select which ephemeral env to deploy to:"
  local choice
  select choice in "${options[@]}"; do
    if [ -n "$choice" ]; then
      printf '%s' "$choice"
      return 0
    fi
    warn "Invalid selection; enter one of the listed numbers."
  done
  die "No selection made."
}

# Resolve the slug for a deploy: the --name flag wins (normalized), else prompt
# to pick from the deployed kal-eph-* Fly apps. There is NO git-branch fallback —
# a deploy ships to a real cloud env on purpose, not whatever branch happens to
# be checked out.
resolve_slug_or_select() {
  local name
  name="$(parse_name_flag "$@")"
  if [ -n "$name" ]; then
    derive_slug "$name"
  else
    select_ephemeral_slug
  fi
}
