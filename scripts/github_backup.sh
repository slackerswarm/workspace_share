#!/bin/bash
PAT="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"
REPO_URL="https://$PAT@github.com/slackerswarm/workspace_share.git"
cd /home/slackerswarm/.openclaw/workspace
git init
git add memory/ skills/ TOOLS.md IDENTITY.md USER.md HEARTBEAT.md # Key files for backup
git commit -m "Daily backup $(date +%Y-%m-%d)" || echo "Nothing to commit"
git remote add origin $REPO_URL || git remote set-url origin $REPO_URL
git push -u origin main --force-with-lease