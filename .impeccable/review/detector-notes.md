Detector run once on changed UI files. Findings:
- forge.css border-top:3px on the inventory dock: intentional brass rail in the user's pinned RPG material world; the dock itself is rectangular, not a rounded accent-border card.
- globals.css decorative grid background: pre-existing .page-backdrop rule. The new forge.css disables .page-backdrop, so this rule does not appear in the workshop.
