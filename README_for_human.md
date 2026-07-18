# Git basics — for moving between machines

Repo: https://github.com/bronze-velocity/wed-1
Main branch: `main`

## The daily loop

Before starting work on a machine, pull the latest:

```
git pull
```

After making changes, check what's changed:

```
git status              # which files were added / modified / deleted
git diff                # see the actual line changes (unstaged)
git diff --staged       # see changes that are staged for commit
```

Stage and commit:

```
git add <file>          # stage a specific file
git add .               # stage everything in the current folder (careful — most certainly includes junk)
git commit -m "message" # commit the staged changes
```

Push to GitHub:

```
git push
```

## Sanity checks

```
git log --oneline -10   # last 10 commits
git branch -vv          # current branch + which remote branch it tracks + ahead/behind
git remote -v           # what remote URLs are configured
```

If `git status` says *"Your branch is ahead of 'origin/main' by N commits"* → you have local commits not yet pushed. Run `git push`.
If it says *"behind by N commits"* → the remote has new commits. Run `git pull`.

## First time on a new machine

Clone the repo:

```
git clone https://github.com/bronze-velocity/wed-1.git
cd wed-1
```

Then install dependencies (pnpm for this project):

```
pnpm install
```

## When you switch machines mid-project

The safe sequence:

1. **On the machine you're leaving:** commit + push everything.
   ```
   git status              # confirm nothing uncommitted
   git push
   ```
2. **On the machine you're arriving at:** pull before touching anything.
   ```
   git pull
   ```

If you forget step 1, the other machine won't see your latest work — and if you commit new stuff on the second machine, you'll end up with two diverged branches (see next section).

## When branches diverge (both machines committed separately)

Symptom: `git push` is rejected with *"Updates were rejected because the remote contains work that you do not have locally."*

Safe fix — rebase your local commits on top of the remote ones:

```
git pull --rebase
```

If it reports conflicts, open the conflicting files, look for `<<<<<<<` / `=======` / `>>>>>>>` markers, edit to what you want, then:

```
git add <resolved-file>
git rebase --continue
git push
```

To bail out mid-rebase and go back to where you started:

```
git rebase --abort
```

## Undoing things (non-destructive)

```
git restore <file>              # discard unstaged changes to a file (careful — irreversible)
git restore --staged <file>     # unstage a file (keeps the edits)
git commit --amend -m "new msg" # fix the LAST commit message (only if not yet pushed)
```

## Rules of thumb

- Commit small and often. Small commits are easier to review, revert, and reason about.
- Always `git pull` before starting work on a machine you haven't touched in a while.
- Never `git push --force` on `main` unless you know exactly what you're doing — it rewrites history for everyone.
- If `git status` is confusing, run `git log --oneline -5` and `git branch -vv` to orient yourself.
