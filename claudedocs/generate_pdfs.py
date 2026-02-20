#!/usr/bin/env python3
"""Generate three PDF documents for the Aba Digital Marketplace project.

PDFs generated:
    1. governor-memo.pdf   - Formal 1-page memorandum
    2. video-script.pdf    - Presenter-friendly walkthrough script
    3. benefits-one-pager.pdf - Strategic benefits overview (1 page)

Dependencies:
    fpdf2 >= 2.7
"""

from pathlib import Path

from fpdf import FPDF

OUTPUT_DIR = Path(__file__).resolve().parent

# Color constants
NAVY = (0, 40, 104)       # #002868
GOLD = (201, 162, 39)     # #C9A227
BLACK = (0, 0, 0)
DARK_GRAY = (50, 50, 50)
MEDIUM_GRAY = (100, 100, 100)
LIGHT_GRAY = (200, 200, 200)
WHITE = (255, 255, 255)
RULE_GRAY = (180, 180, 180)


# ---------------------------------------------------------------------------
# PDF 1: Governor Memo
# ---------------------------------------------------------------------------

def generate_governor_memo() -> None:
    """Generate a clean, formal 1-page memorandum PDF."""
    pdf = FPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=False)
    pdf.add_page()
    pdf.set_margins(25, 20, 25)

    usable_w = 210 - 50  # page width minus left+right margins

    # --- MEMORANDUM header ---
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*BLACK)
    pdf.set_xy(25, 18)
    pdf.cell(usable_w, 10, "MEMORANDUM", align="C", new_x="LMARGIN", new_y="NEXT")

    # Horizontal rule
    y_rule = pdf.get_y() + 2
    pdf.set_draw_color(*RULE_GRAY)
    pdf.set_line_width(0.5)
    pdf.line(25, y_rule, 185, y_rule)
    pdf.set_y(y_rule + 4)

    # --- TO / FROM / DATE / RE fields ---
    def _field(label: str, value: str) -> None:
        x_start = 25
        pdf.set_x(x_start)
        pdf.set_font("Helvetica", "B", 10)
        pdf.cell(18, 5, label, new_x="END")
        pdf.set_font("Helvetica", "", 10)
        pdf.multi_cell(usable_w - 18, 5, value, new_x="LMARGIN", new_y="NEXT")

    _field("TO:", "His Excellency Dr. Alex Chioma Otti, OFR, Executive Governor of Abia State")
    pdf.set_y(pdf.get_y() + 1)
    _field("FROM:", "Stringz Technologies LLC")
    pdf.set_y(pdf.get_y() + 1)
    _field("DATE:", "February 2026")
    pdf.set_y(pdf.get_y() + 1)
    _field("RE:", "Proposal for a 90-Day Pilot -- Aba Digital Marketplace (madeinaba.net)")

    # Second rule
    y_rule2 = pdf.get_y() + 3
    pdf.line(25, y_rule2, 185, y_rule2)
    pdf.set_y(y_rule2 + 5)

    # --- Body helper ---
    body_size = 9.5
    line_h = 4.2

    def _body(text: str) -> None:
        pdf.set_font("Helvetica", "", body_size)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(25)
        pdf.multi_cell(usable_w, line_h, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 2)

    def _section_header(text: str) -> None:
        pdf.set_font("Helvetica", "B", body_size)
        pdf.set_text_color(*BLACK)
        pdf.set_x(25)
        # Print header inline then continue with body
        pdf.cell(pdf.get_string_width(text) + 1, line_h, text, new_x="END")

    def _section_body_inline(text: str) -> None:
        """Continue on the same line after a bold header."""
        pdf.set_font("Helvetica", "", body_size)
        pdf.set_text_color(*DARK_GRAY)
        remaining_w = 185 - pdf.get_x()
        # Use multi_cell for wrapping from current position
        pdf.multi_cell(remaining_w, line_h, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 1.5)

    def _body_full(text: str) -> None:
        pdf.set_font("Helvetica", "", body_size)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(25)
        pdf.multi_cell(usable_w, line_h, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 1.5)

    def _bullet(text: str) -> None:
        pdf.set_font("Helvetica", "", body_size)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(30)
        pdf.cell(5, line_h, "-", new_x="END")
        pdf.multi_cell(usable_w - 10, line_h, text, new_x="LMARGIN", new_y="NEXT")

    # Salutation
    pdf.set_font("Helvetica", "", body_size)
    pdf.set_text_color(*DARK_GRAY)
    pdf.set_x(25)
    pdf.cell(usable_w, line_h, "Your Excellency,", new_x="LMARGIN", new_y="NEXT")
    pdf.set_y(pdf.get_y() + 2)

    _body_full(
        "We write to present a ready-to-deploy digital marketplace platform purpose-built "
        "for Aba's trading economy. A five-minute video walkthrough accompanies this memo. "
        "We respectfully request your consideration of a structured pilot that would make "
        "Abia the first Nigerian state to operate a government-backed digital marketplace at scale."
    )

    # The Opportunity
    _section_header("The Opportunity.")
    _section_body_inline(
        " Aba's markets generate an estimated 144 billion naira in annual trade volume, yet "
        "virtually none of this commerce is visible online. Across Ariaria International Market "
        "alone, over 70,000 shops and 160,000 artisans operate without a digital registry, without "
        "e-commerce infrastructure, and almost entirely on cash. Buyers who would purchase Aba-made "
        "goods -- across Nigeria and the diaspora -- simply cannot find them. This is a solvable problem."
    )

    # What We Have Built
    _section_header("What We Have Built.")
    _section_body_inline(
        " At our own cost, Stringz Technologies has designed and developed a working prototype of "
        "the Aba Digital Marketplace, accessible at madeinaba.net. The platform enables trader "
        "onboarding, product listing, buyer discovery, and a real-time government analytics dashboard. "
        "Critically, it is built for Aba's traders as they are today: the system operates via WhatsApp, "
        "USSD, and web, so traders do not need smartphones or technical literacy to participate. The "
        "enclosed video walkthrough demonstrates the full platform in under five minutes."
    )

    # The Ask
    _section_header("The Ask.")
    _section_body_inline(
        " We propose a 90-day pilot scoped to a single market zone -- the A-Line section of Ariaria "
        "-- with milestone-based funding of 100 million naira, disbursed against verified deliverables:"
    )

    _bullet("Day 30: 500 verified traders onboarded, 2,000+ products live on the platform")
    _bullet(
        "Day 90: 2,000 verified traders, 10,000+ products, and a live government dashboard "
        "reporting trade activity, trader data, and market analytics"
    )
    pdf.set_y(pdf.get_y() + 1)

    _body_full(
        "Payments would be tied to the achievement of each milestone. If deliverables are not met, "
        "remaining funds are not disbursed."
    )

    # Why Now
    _section_header("Why Now.")
    _section_body_inline(
        " Three conditions make this the right moment. First, the Phase II reconstruction of the "
        "A-Line market creates a natural integration point -- digital infrastructure alongside "
        "physical rebuilding. Second, the Government of Abia Digital Agency (GADA) already exists "
        "as the institutional home for this initiative. Third, no other Nigerian state has moved on "
        "this; Abia has the opportunity to lead. Conservative revenue projections place the platform's "
        "potential at 107 to 178 million naira annually within the first two years through listing "
        "fees, promotion tools, and transaction services."
    )

    # Request
    _section_header("Request.")
    _section_body_inline(
        " We respectfully request an audience with Your Excellency or your designated representative "
        "to present the platform in detail and discuss pilot terms. We are prepared to begin within "
        "30 days of approval."
    )

    _body_full(
        "We thank Your Excellency for your time and your continued commitment to the economic "
        "transformation of Abia State."
    )

    # Closing
    pdf.set_y(pdf.get_y() + 3)
    pdf.set_font("Helvetica", "", body_size)
    pdf.set_text_color(*DARK_GRAY)
    pdf.set_x(25)
    pdf.cell(usable_w, line_h, "Respectfully submitted,", new_x="LMARGIN", new_y="NEXT")
    pdf.set_y(pdf.get_y() + 4)
    pdf.set_font("Helvetica", "B", body_size)
    pdf.set_text_color(*BLACK)
    pdf.set_x(25)
    pdf.cell(usable_w, line_h, "Stringz Technologies LLC", new_x="LMARGIN", new_y="NEXT")

    output_path = OUTPUT_DIR / "governor-memo.pdf"
    pdf.output(str(output_path))
    print(f"  [OK] {output_path.name}")


# ---------------------------------------------------------------------------
# PDF 2: Video Script
# ---------------------------------------------------------------------------

def generate_video_script() -> None:
    """Generate a presenter-friendly video walkthrough script PDF."""
    pdf = FPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.set_margins(20, 20, 20)
    usable_w = 210 - 40

    pdf.add_page()

    # --- Title page header ---
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*NAVY)
    pdf.cell(usable_w, 12, "VIDEO WALKTHROUGH SCRIPT", align="C", new_x="LMARGIN", new_y="NEXT")
    pdf.set_y(pdf.get_y() + 2)

    pdf.set_font("Helvetica", "", 12)
    pdf.set_text_color(*MEDIUM_GRAY)
    pdf.cell(
        usable_w, 7,
        "Aba Digital Marketplace -- Presentation to HE Governor Alex Otti",
        align="C", new_x="LMARGIN", new_y="NEXT",
    )
    pdf.set_y(pdf.get_y() + 1)

    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(*MEDIUM_GRAY)
    pdf.cell(
        usable_w, 5,
        "Site: madeinaba.net  |  Access Code: StringzAbia2026  |  Target Runtime: 4-5 minutes",
        align="C", new_x="LMARGIN", new_y="NEXT",
    )

    # Rule
    pdf.set_y(pdf.get_y() + 4)
    pdf.set_draw_color(*NAVY)
    pdf.set_line_width(0.8)
    pdf.line(20, pdf.get_y(), 190, pdf.get_y())
    pdf.set_y(pdf.get_y() + 6)

    # --- Helper functions ---
    def _section_header(number: int, title: str, timestamp: str) -> None:
        """Print section header like SECTION 1: OPENING [0:00 - 0:30]"""
        # Check if we need a new page (need at least 40mm for header + some content)
        if pdf.get_y() > 250:
            pdf.add_page()
        pdf.set_font("Helvetica", "B", 13)
        pdf.set_text_color(*NAVY)
        pdf.set_x(20)
        text = f"SECTION {number}: {title}  [{timestamp}]"
        pdf.cell(usable_w, 8, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 1)
        # Thin rule under section header
        pdf.set_draw_color(*GOLD)
        pdf.set_line_width(0.4)
        pdf.line(20, pdf.get_y(), 100, pdf.get_y())
        pdf.set_y(pdf.get_y() + 4)

    def _screen_direction(text: str) -> None:
        """Print screen direction in italic gray."""
        pdf.set_font("Helvetica", "I", 9)
        pdf.set_text_color(*MEDIUM_GRAY)
        pdf.set_x(25)
        pdf.multi_cell(usable_w - 10, 4.5, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 2)

    def _narration(text: str) -> None:
        """Print spoken narration in normal black text."""
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(20)
        pdf.multi_cell(usable_w, 5, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 2)

    def _narration_bold_phrase(parts: list[tuple[str, bool]]) -> None:
        """Print narration with mixed bold/normal segments using multi_cell with markdown."""
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(20)
        # Build markdown string for fpdf2
        md_text = ""
        for text, bold in parts:
            if bold:
                md_text += f"**{text}**"
            else:
                md_text += text
        pdf.multi_cell(usable_w, 5, md_text, new_x="LMARGIN", new_y="NEXT", markdown=True)
        pdf.set_y(pdf.get_y() + 2)

    def _spacer(h: float = 3) -> None:
        pdf.set_y(pdf.get_y() + h)

    # ===== SECTION 1: OPENING =====
    _section_header(1, "OPENING", "0:00 - 0:30")
    _screen_direction("FACE TO CAMERA -- Clean background. Professional but warm. Look directly at the lens.")
    _narration("Good day, Your Excellency.")
    _narration("My name is [PRESENTER NAME], and I lead the team at Stringz Technologies.")
    _narration_bold_phrase([
        ("I want to take ", False), ("four minutes", True),
        (" of your time to show you something we built -- specifically for Abia State.", False),
    ])
    _narration_bold_phrase([
        ("We spent months studying Aba's markets, talking to traders, reading the data. "
         "And we believe there is an opportunity here that ", False),
        ("no other state in Nigeria has captured yet", True), (".", False),
    ])
    _narration("What I am about to show you is live, right now, at madeinaba.net.")
    _narration("Let me walk you through it.")

    # ===== SECTION 2: THE PROBLEM AND THE RESEARCH =====
    _section_header(2, "THE PROBLEM AND THE RESEARCH", "0:30 - 1:30")
    _screen_direction(
        "Switch to screen share. Browser is open to madeinaba.net. Enter the access code: "
        "StringzAbia2026. The Overview screen loads."
    )
    _screen_direction(
        "The Research Foundation screen is now visible. Scroll slowly past the Governor's "
        "photo and vision statement at the top."
    )
    _narration_bold_phrase([
        ("Your Excellency, this entire proposal is built on evidence. Not assumptions -- ", False),
        ("research", True), (".", False),
    ])
    _screen_direction(
        "Pause on the KEY RESEARCH FINDINGS stat cards -- 37,000 shops, N144B trade volume, "
        "110,000+ shoemakers, 50,000+ garment makers."
    )
    _narration_bold_phrase([
        ("Look at these numbers. Ariaria alone has ", False),
        ("37,000 shops", True),
        (". Aba's annual trade is estimated at ", False),
        ("one hundred and forty-four billion naira", True),
        (". There are over ", False),
        ("110,000 shoemakers", True),
        (" and 50,000 garment makers. This is a manufacturing city.", False),
    ])
    _narration("But here is the problem.")
    _screen_direction("Scroll down to THE POWER CRISIS section with the red-bordered stats.")
    _narration_bold_phrase([
        ("32,000 of those shops had no power after the failed 2019 solar project. Traders spend ", False),
        ("one billion naira a year", True),
        (" just on generators. And despite all of this activity, Abia ranked ", False),
        ("35th out of 37 states", True), (" in economic growth.", False),
    ])
    _narration("The talent is there. The products are there. The infrastructure is not.")
    _screen_direction("Scroll down to WHAT ABA TRADERS ARE SAYING -- the trader quotes section.")
    _narration_bold_phrase([
        ("And these are not our words. These are ", False),
        ("real traders, real quotes", True),
        (", gathered from investigative journalism.", False),
    ])
    _screen_direction("Pause briefly on Joseph Nmeri's quote about labeling shoes \"Made in China.\"")
    _narration_bold_phrase([
        ("This man, Joseph Nmeri -- Chairman of the Power Line Shoe Manufacturers -- said his "
         "members were ", False),
        ("forced to label their shoes \"Made in China\"", True),
        (" because customers would not buy shoes labeled \"Made in Aba.\"", False),
    ])
    _narration_bold_phrase([
        ("That is the problem we are solving. ", False),
        ("Visibility. Trust. Access.", True),
    ])

    # ===== SECTION 3: THE SOLUTION =====
    _section_header(3, "THE SOLUTION", "1:30 - 2:30")
    _screen_direction("Click the \"Why Aba\" tab in the navigation.")
    _screen_direction(
        "Scroll past the hero section to \"THE PROBLEM: INVISIBLE ECONOMY\" -- the two-column comparison."
    )
    _narration_bold_phrase([
        ("Your Excellency, this is what we call the ", False),
        ("invisible economy", True),
        (". On the left -- today's reality. No trader registry. Cash only. No audit trail. "
         "Revenue leakage everywhere. Buyers have to ", False),
        ("physically travel to Aba", True),
        (" to buy anything.", False),
    ])
    _narration_bold_phrase([
        ("On the right -- what a digital layer creates. NIN-verified traders. Escrow payments. "
         "A real-time dashboard. Online catalog. ", False),
        ("For the first time, the government can actually see what is happening in its own markets.", True),
    ])
    _screen_direction("Scroll to the thesis statement card -- the one highlighted in blue.")
    _narration("This is the core idea. Read it with me:")
    _narration_bold_phrase([
        ("\"A digital layer turns informal trade into visible economic infrastructure -- "
         "measurable, taxable, and investable.\"", True),
    ])
    _narration("That is what this platform does.")
    _screen_direction(
        "Scroll down to \"WHY NOT JUST USE JUMIA OR INSTAGRAM?\" -- the four-column comparison."
    )
    _narration("Now, someone will ask -- why not just use Jumia? Why not Instagram?")
    _narration_bold_phrase([
        ("Here is the difference. Jumia takes ", False),
        ("15 to 25 percent commission", True),
        (". Instagram has no escrow, no verification, no data. Neither of them gives "
         "government anything.", False),
    ])
    _narration_bold_phrase([
        ("This platform is ", False),
        ("state-owned", True),
        (". Low fees. NIN verification. The government owns the data, owns the trader registry, "
         "owns the infrastructure. It is not a website. ", False),
        ("It is an economic asset.", True),
    ])
    _screen_direction("Scroll to the \"WHY NOW\" section showing the three timing cards.")
    _narration_bold_phrase([
        ("And the timing is right. ", False),
        ("Phase II of the A-Line rebuild just flagged off.", True),
        (" New physical infrastructure is going up -- this is the digital layer that sits on top "
         "of it. GADA already has the mandate. And no other state has done this. ", False),
        ("The window is open.", True),
    ])

    # ===== SECTION 4: WHAT IS ACHIEVABLE =====
    _section_header(4, "WHAT IS ACHIEVABLE", "2:30 - 3:15")
    _screen_direction("Click the \"Quick Wins\" tab in the navigation.")
    _screen_direction("Pause on the 30-DAY section.")
    _narration_bold_phrase([
        ("Here is what we can deliver in ", False),
        ("30 days", True),
        (". 500 NIN-verified sellers. Over 2,000 product listings. All from the A-Line "
         "pilot zone -- aligned with the rebuild.", False),
    ])
    _narration("And here is the headline that is ready for the press on Day 30:")
    _screen_direction("Point to or highlight the green ANNOUNCEMENT READY box.")
    _narration_bold_phrase([
        ("\"Abia launches Nigeria's first verified trader marketplace -- 500 Aba artisans "
         "now discoverable online.\"", True),
    ])
    _narration_bold_phrase([
        ("That is an announcement ", False),
        ("no other governor in Nigeria can make today", True),
        (".", False),
    ])
    _screen_direction("Scroll down to the 90-DAY section.")
    _narration_bold_phrase([
        ("By Day 90 -- ", False),
        ("2,000 verified sellers", True),
        (". Over 10,000 product listings. Three logistics partners onboarded. And a ", False),
        ("live government dashboard", True),
        (" showing real-time data on traders, products, orders, and revenue.", False),
    ])
    _screen_direction("Scroll to \"WHAT GOVERNMENT RECEIVES AT 90 DAYS\" -- the deliverables list.")
    _narration_bold_phrase([
        ("At the end of 90 days, the government receives a permanent NIN-verified trader "
         "registry, a live analytics dashboard, monthly economic reports, and a catalogued "
         "product database. These are ", False),
        ("state assets", True),
        (". They do not disappear when the project ends.", False),
    ])

    # ===== SECTION 5: THE ASK =====
    _section_header(5, "THE ASK", "3:15 - 3:45")
    _screen_direction("Click the \"Pilot Ask\" tab in the navigation.")
    _screen_direction("The bold N100M pilot parameters section is visible.")
    _narration("Your Excellency, the ask is straightforward.")
    _narration_bold_phrase([
        ("One hundred million naira. 90 days. One market zone -- Ariaria A-Line.", True),
    ])
    _screen_direction("Scroll to the budget breakdown.")
    _narration(
        "Every naira is accounted for. Platform development and infrastructure -- 38 million. "
        "Trader onboarding and field operations -- 22 million. Training, support and operations "
        "-- 15 million. Marketing and activation -- 15 million. Contingency -- 10 million."
    )
    _screen_direction("Scroll to the milestone-based payment note.")
    _narration_bold_phrase([
        ("And this is ", False),
        ("milestone-based", True),
        (". Government pays in three tranches. 40 percent at kickoff. 30 percent at Day 30 "
         "-- only after verified deliverables. 30 percent at Day 90. ", False),
        ("No delivery, no payment.", True),
    ])
    _screen_direction(
        "Scroll quickly past the success criteria -- 500+ traders, 2000+ products, "
        "500+ transactions, N5M+ volume, live dashboard."
    )
    _narration(
        "These are the success criteria. Clear numbers. Either we hit them, or we did not. "
        "There is no ambiguity."
    )

    # ===== SECTION 6: THE LIVE DEMO =====
    _section_header(6, "THE LIVE DEMO", "3:45 - 4:15")
    _screen_direction("Click the \"Home\" tab in the navigation.")
    _narration("Now, let me show you what this actually looks like.")
    _screen_direction(
        "The Home screen loads with the hero section, AI search bar, categories, and featured products."
    )
    _narration(
        "This is the marketplace. Government-branded. NIN-verified sellers. Every product "
        "shows a \"Made in Aba\" badge. Buyers can shop by category -- footwear, bags, fashion, "
        "leather goods."
    )
    _screen_direction("Click the \"Products\" tab to go to the Listings screen.")
    _narration_bold_phrase([
        ("Here are live product listings. Real Aba products with prices, ratings, verified "
         "seller badges. A buyer in Lagos can find and order from an Aba trader ", False),
        ("without ever visiting Ariaria", True),
        (".", False),
    ])
    _screen_direction("Click back to \"Home\" and scroll to the AI Shopping Assistant search box.")
    _narration("And here is what makes this different from anything else in Nigeria.")
    _screen_direction(
        "Click the \"Igbo\" language button in the AI search. Type or show a sample query "
        "like \"Achoro m akpukpo ukwu maka agbamakwukwo\" and press search."
    )
    _narration_bold_phrase([
        ("This is an ", False),
        ("AI shopping assistant that speaks Igbo", True),
        (". And Yoruba. And Hausa. And Pidgin. A buyer can type \"I wan buy wedding shoe "
         "size 43\" in Pidgin, and the AI understands, finds matching products, and suggests "
         "options.", False),
    ])
    _screen_direction("Click the \"AI Platform\" tab to briefly show the WhatsApp AI demo.")
    _narration_bold_phrase([
        ("It works through WhatsApp too. Traders can send a product photo and the AI creates "
         "the listing automatically. Buyers can track orders. Government officials can ", False),
        ("ask the dashboard questions in plain English", True),
        (" and get answers.", False),
    ])
    _narration_bold_phrase([("This already works.", True)])

    # ===== SECTION 7: CLOSING =====
    _section_header(7, "CLOSING", "4:15 - 4:45")
    _screen_direction("FACE TO CAMERA -- Same setup as the opening. Calm, direct, respectful.")
    _narration("Your Excellency, let me close with this.")
    _narration_bold_phrase([
        ("Abia State has the traders. It has the products. It has a governor who is already ", False),
        ("rebuilding the physical markets", True),
        (" through the A-Line project and the GADA mandate.", False),
    ])
    _narration_bold_phrase([
        ("What is missing is the digital layer. The part that makes Aba's economy ", False),
        ("visible to the world", True),
        (".", False),
    ])
    _narration_bold_phrase([
        ("No Nigerian state has built this.", True),
        (" Not Lagos. Not Kano. Not Ogun. Abia can be the first. And it can be done in 90 days.", False),
    ])
    _narration_bold_phrase([
        ("We are not asking you to take our word for it. We are asking for ", False),
        ("a meeting", True),
        (" -- 30 minutes with your team -- to walk through this in detail and answer "
         "every question.", False),
    ])
    _narration_bold_phrase([
        ("The platform is live at ", False),
        ("madeinaba.net", True),
        (". The research is real. The numbers are sourced. And we built this on our own, at our "
         "own cost, because we believe in what Abia can become.", False),
    ])
    _narration("Thank you for your time, sir.")
    _screen_direction(
        "PAUSE -- Hold eye contact with the camera for two full seconds before ending the recording."
    )

    # ===== PRODUCTION NOTES =====
    # Force new page if less than 60mm remaining
    if pdf.get_y() > 220:
        pdf.add_page()

    _spacer(5)
    pdf.set_draw_color(*NAVY)
    pdf.set_line_width(0.8)
    pdf.line(20, pdf.get_y(), 190, pdf.get_y())
    pdf.set_y(pdf.get_y() + 5)

    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(*NAVY)
    pdf.set_x(20)
    pdf.cell(usable_w, 8, "PRODUCTION NOTES", new_x="LMARGIN", new_y="NEXT")
    _spacer(3)

    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*BLACK)
    pdf.set_x(20)
    pdf.cell(usable_w, 6, "Total runtime target: 4 minutes 15 seconds to 4 minutes 45 seconds",
             new_x="LMARGIN", new_y="NEXT")
    _spacer(3)

    def _production_heading(text: str) -> None:
        pdf.set_font("Helvetica", "B", 10)
        pdf.set_text_color(*BLACK)
        pdf.set_x(20)
        pdf.cell(usable_w, 6, text, new_x="LMARGIN", new_y="NEXT")
        pdf.set_y(pdf.get_y() + 1)

    def _production_bullet(text: str) -> None:
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(25)
        pdf.cell(5, 4.5, "-", new_x="END")
        pdf.multi_cell(usable_w - 10, 4.5, text, new_x="LMARGIN", new_y="NEXT")

    _production_heading("Pacing guidance:")
    _production_bullet(
        "Do not rush sections 2 and 3. The research and the problem statement are what "
        "build credibility. Let the numbers breathe."
    )
    _production_bullet(
        "Sections 5 and 6 should be brisk. The governor already understands the value by "
        "this point -- move with confidence."
    )
    _production_bullet("The closing must be slow. Every word deliberate.")
    _spacer(2)

    _production_heading("Screen recording tips:")
    _production_bullet("Use a clean browser with no bookmarks bar, no other tabs visible.")
    _production_bullet("Set browser zoom to 110% so text is clearly readable in the recording.")
    _production_bullet("Scroll smoothly -- do not jump. Let the viewer read along with you.")
    _production_bullet("When pausing on a stat or quote, give it a full 2-3 seconds of silence.")
    _spacer(2)

    _production_heading("Key phrases to emphasize (bold in script):")
    key_phrases = [
        "\"No other state in Nigeria has captured yet\"",
        "\"37,000 shops\"",
        "\"One hundred and forty-four billion naira\"",
        "\"Forced to label their shoes Made in China\"",
        "\"Measurable, taxable, and investable\"",
        "\"It is an economic asset\"",
        "\"No delivery, no payment\"",
        "\"This already works\"",
        "\"No Nigerian state has built this\"",
    ]
    for phrase in key_phrases:
        _production_bullet(phrase)
    _spacer(2)

    _production_heading("What NOT to do:")
    _production_bullet("Do not apologize for the prototype being a demo. Present it as a working platform.")
    _production_bullet(
        "Do not use tech jargon (API, frontend, backend, React). The governor is a banker "
        "-- speak in outcomes and assets."
    )
    _production_bullet("Do not read the screen word for word. Talk over it like you know it by heart.")
    _production_bullet(
        "Do not oversell the revenue projections. Let the numbers on screen do that work."
    )
    _production_bullet("Do not exceed 5 minutes. Respect the governor's time and he will respect yours.")

    output_path = OUTPUT_DIR / "video-script.pdf"
    pdf.output(str(output_path))
    print(f"  [OK] {output_path.name}")


# ---------------------------------------------------------------------------
# PDF 3: Benefits One-Pager
# ---------------------------------------------------------------------------

def generate_benefits_one_pager() -> None:
    """Generate a 1-page strategic benefits overview PDF."""
    pdf = FPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=False)
    pdf.add_page()

    page_w = 210
    margin_l = 15
    margin_r = 15
    usable_w = page_w - margin_l - margin_r

    # ===== HEADER SECTION =====
    pdf.set_xy(margin_l, 10)
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(*NAVY)
    pdf.cell(usable_w, 10, "ABA DIGITAL MARKETPLACE", align="C", new_x="LMARGIN", new_y="NEXT")

    pdf.set_x(margin_l)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*GOLD)
    pdf.cell(
        usable_w, 6,
        "Strategic Benefits for His Excellency & Abia State",
        align="C", new_x="LMARGIN", new_y="NEXT",
    )

    # Gold accent line
    y_line = pdf.get_y() + 2
    pdf.set_draw_color(*GOLD)
    pdf.set_line_width(0.6)
    pdf.line(margin_l + 30, y_line, page_w - margin_r - 30, y_line)
    pdf.set_y(y_line + 4)

    # ===== SECTION RENDERING HELPERS =====
    section_title_size = 10.5
    body_size = 8
    bullet_line_h = 3.6
    section_gap = 3.5

    def _section_title(icon: str, title: str) -> None:
        pdf.set_font("Helvetica", "B", section_title_size)
        pdf.set_text_color(*NAVY)
        pdf.set_x(margin_l)
        pdf.cell(usable_w, 5.5, f"{icon}  {title}", new_x="LMARGIN", new_y="NEXT")
        # Thin navy underline
        y_ul = pdf.get_y() + 0.5
        pdf.set_draw_color(*NAVY)
        pdf.set_line_width(0.3)
        pdf.line(margin_l, y_ul, margin_l + 90, y_ul)
        pdf.set_y(y_ul + 2)

    def _bullet(text: str) -> None:
        pdf.set_font("Helvetica", "", body_size)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(margin_l + 3)
        pdf.cell(4, bullet_line_h, "-", new_x="END")
        pdf.multi_cell(usable_w - 7, bullet_line_h, text, new_x="LMARGIN", new_y="NEXT")

    def _bullet_bold_value(text: str) -> None:
        """Bullet with markdown bold support."""
        pdf.set_font("Helvetica", "", body_size)
        pdf.set_text_color(*DARK_GRAY)
        pdf.set_x(margin_l + 3)
        pdf.cell(4, bullet_line_h, "-", new_x="END")
        pdf.multi_cell(
            usable_w - 7, bullet_line_h, text,
            new_x="LMARGIN", new_y="NEXT", markdown=True,
        )

    def _section_spacer() -> None:
        pdf.set_y(pdf.get_y() + section_gap)

    # ===== SECTION 1: DIRECT REVENUE STREAMS =====
    _section_title("$", "DIRECT REVENUE STREAMS")
    _bullet("Transaction levies (1-1.5% on every digital transaction -- automated, no leakage)")
    _bullet_bold_value("Annual trader registration fees (N5-10K per trader x thousands of traders)")
    _bullet_bold_value("Premium listing fees (N5-15K/month for featured placement)")
    _bullet_bold_value("**Conservative Year 1-2 projection: N107-178M annually**")
    _bullet_bold_value("**Full potential Year 3-5: N632M - N1B annually**")
    _section_spacer()

    # ===== SECTION 2: NEW BUSINESSES =====
    _section_title("+", "NEW BUSINESSES THE STATE CAN SPIN UP")
    _bullet("State-backed logistics network (delivery fleet serving buyers & sellers -- per-delivery fees)")
    _bullet("Warehousing & fulfillment centers (storage hubs in Aba -- rental income)")
    _bullet("Quality certification body (\"Made in Aba\" verification -- certification fees)")
    _bullet("Trade finance / micro-lending (data-backed loans to verified traders -- interest revenue)")
    _bullet("Packaging & branding services (professional packaging for e-commerce -- service fees)")
    _section_spacer()

    # ===== SECTION 3: DATA & INTELLIGENCE =====
    _section_title("~", "DATA & INTELLIGENCE (THE HIDDEN GOLD)")
    _bullet("First-ever digital trader registry (NIN-verified -- who trades, what, where, how much)")
    _bullet("Real-time economic activity data (transaction volumes, growth trends, seasonal patterns)")
    _bullet("Tax & levy optimization (data-driven collection replaces manual guesswork)")
    _bullet("Policy planning intelligence (which sectors grow, which need support, where to invest)")
    _bullet("Investor pitch material (hard data to attract FDI and federal funding)")
    _bullet("Citizen database asset (traders' information, business profiles, economic contributions)")
    _section_spacer()

    # ===== SECTION 4: LEGACY & POLITICAL CAPITAL =====
    _section_title("*", "LEGACY & POLITICAL CAPITAL")
    _bullet("\"First Nigerian state to build a digital marketplace\" -- national press headline")
    _bullet("Visible modernization aligned with A-Line market rebuild")
    _bullet("Demonstrable economic data for federal engagement")
    _bullet("Blueprint other states will want to license (additional revenue)")
    _bullet("International recognition (\"China of Africa goes digital\")")
    _bullet("Permanent infrastructure that outlasts any administration")
    _section_spacer()

    # ===== SECTION 5: SOCIAL IMPACT =====
    _section_title("#", "SOCIAL IMPACT")
    _bullet("Traders reach buyers nationwide without leaving Aba")
    _bullet("Women and youth traders gain equal digital visibility")
    _bullet("\"Made in Aba\" brand rehabilitation (no more labeling goods \"Made in China\")")
    _bullet("Financial inclusion through escrow and digital payments")
    _bullet("USSD and WhatsApp access means no trader is excluded")

    # ===== BOTTOM BAR =====
    bar_y = 282
    bar_h = 8
    pdf.set_fill_color(*NAVY)
    pdf.rect(0, bar_y, page_w, bar_h, "F")
    pdf.set_xy(0, bar_y + 1.5)
    pdf.set_font("Helvetica", "", 7.5)
    pdf.set_text_color(*WHITE)
    pdf.cell(
        page_w, 5,
        "Prepared by Stringz Technologies LLC   |   madeinaba.net   |   Confidential",
        align="C",
    )

    output_path = OUTPUT_DIR / "benefits-one-pager.pdf"
    pdf.output(str(output_path))
    print(f"  [OK] {output_path.name}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main() -> None:
    """Generate all three PDF documents."""
    print("Generating PDFs...")
    print(f"Output directory: {OUTPUT_DIR}\n")

    generate_governor_memo()
    generate_video_script()
    generate_benefits_one_pager()

    print("\nAll PDFs generated successfully.")


if __name__ == "__main__":
    main()
