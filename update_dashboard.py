import re

with open('dashboard.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Remove the old sub-balances
content = re.sub(
    r'<!-- Sub-balances -->\s*<div class="balance-sub-rows">.*?</div>\s*</div>',
    '</div>',
    content,
    flags=re.DOTALL
)

# 2. Add the wallet cards right after the balance card section
wallets_html = """
        <!-- ── WALLETS ─────────────────────────────── -->
        <section aria-label="Wallets" style="margin-bottom: var(--space-8);">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-4);">
            <!-- NGN Wallet -->
            <div class="card" style="padding: var(--space-6); background: var(--color-dark-navy); color: white; border-radius: 20px;">
               <div style="font-size: var(--font-size-sm); color: rgba(255,255,255,0.7); margin-bottom: var(--space-2); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">NGN Wallet</div>
               <div style="font-size: clamp(1.75rem, 5vw, 2.25rem); font-weight: 700; margin-bottom: var(--space-6);" aria-live="polite">
                 <span class="bal-show">₦250,000.00</span>
                 <span class="bal-hide">₦•••,•••.••</span>
               </div>
               <div style="display: flex; gap: var(--space-2);">
                  <button class="btn btn-outline" style="border-color: rgba(255,255,255,0.2); color: white; background: rgba(255,255,255,0.1);">Fund</button>
                  <button class="btn btn-outline" style="border-color: rgba(255,255,255,0.2); color: white; background: rgba(255,255,255,0.1);">Withdraw</button>
               </div>
            </div>
            <!-- USD Wallet -->
            <div class="card" style="padding: var(--space-6); background: var(--color-primary); color: white; border-radius: 20px;">
               <div style="font-size: var(--font-size-sm); color: rgba(255,255,255,0.7); margin-bottom: var(--space-2); text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">USD Wallet</div>
               <div style="font-size: clamp(1.75rem, 5vw, 2.25rem); font-weight: 700; margin-bottom: var(--space-6);" aria-live="polite">
                 <span class="bal-show">$500.00</span>
                 <span class="bal-hide">$•••.••</span>
               </div>
               <div style="display: flex; gap: var(--space-2);">
                  <button class="btn btn-outline" style="border-color: rgba(255,255,255,0.2); color: white; background: rgba(255,255,255,0.1);">Fund</button>
                  <button class="btn btn-outline" style="border-color: rgba(255,255,255,0.2); color: white; background: rgba(255,255,255,0.1);">Withdraw</button>
               </div>
            </div>
          </div>
        </section>
"""
content = re.sub(
    r'(</section>)\s*(<!-- ── 3\. QUICK ACTIONS)',
    rf'\1\n{wallets_html}\n        \2',
    content
)

# 3. Limit recent transactions to 3
# Find the start of the 4th transaction and remove until the end of the ul
content = re.sub(
    r'(<!-- 4\. Kwik Delivery — Debit — Pending -->).*?(</ul>)',
    r'\2',
    content,
    flags=re.DOTALL
)

with open('dashboard.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated dashboard.")
