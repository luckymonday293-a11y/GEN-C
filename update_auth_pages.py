import re

def update_file(filename, headline, subhead):
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    # Update CSS
    content = re.sub(
        r'/\* Subtle.*?pointer-events: none;\s*\}',
        r"""/* Brand Panel Overlay */
    .brand-panel::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(to bottom, rgba(15, 23, 42, 0.2) 0%, rgba(15, 23, 42, 0.8) 100%);
      pointer-events: none;
    }""",
        content,
        flags=re.DOTALL
    )
    
    # Add background image
    if "background-image: url('assets/images/auth-bg.jpg');" not in content:
        content = content.replace(
            "background: var(--color-dark-navy);",
            "background: var(--color-dark-navy);\n      background-image: url('assets/images/auth-bg.jpg');\n      background-size: cover;\n      background-position: center;"
        )

    # Update HTML copy
    content = re.sub(
        r'<h1 class="brand-panel__headline">.*?</h1>',
        f'<h1 class="brand-panel__headline">{headline}</h1>',
        content,
        flags=re.DOTALL
    )
    
    content = re.sub(
        r'<p class="brand-panel__sub">.*?</p>',
        f'<p class="brand-panel__sub">{subhead}</p>',
        content,
        flags=re.DOTALL
    )

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(content)

update_file(
    "login.html", 
    "Your world.<br />Your money.<br />One account.", 
    "Pick up where you left off."
)
update_file(
    "signup.html", 
    "Your money.<br />Your moves.<br />Your future.", 
    "Start building a smarter relationship with your money."
)
print("Updated login and signup.")
