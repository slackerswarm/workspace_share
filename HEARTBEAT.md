# Heartbeat Configuration
Interval: 15 minutes
Tasks:
- Self-optimization loop: Evaluate current goals from identity.md, suggest improvements.
- System check: Verify integrations (Stripe, X, GitHub).
- Backup: Daily data export to GitHub repo.
New: Daily Passive Revenue Optimization (using passive-revenue skill)
- Run at 00:00 UTC: passive-revenue evaluate-all --report-to "daily-revenue.log"
- If revenue < $100/day: Suggest implementations (e.g., new affiliate).
- Log to X: Post summary thread if >$500 gain.