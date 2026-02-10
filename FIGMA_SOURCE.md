# Figma design source

This implementation is driven by the following Figma design (recreated from the “Implement this design from Figma” prompt).

- **File:** ECOM-2 - Ideation  
- **URL:** https://www.figma.com/design/4blV8cueIOXSVyVE2l4gDB/ECOM-2---Ideation  
- **Frame (node):** `6188:143875` – Stadium Tours landing (Tour - landing - M)

## Design system

- **design-system.json** – Tokens (colors, spacing, typography, radius, components) are aligned with Figma variables for this frame.
- **src/index.css** – CSS custom properties map from `design-system.json` for use in components.

## Page structure (from Figma)

1. **Header** – Menu, logo, profile, basket (64px, core secondary background).
2. **Breadcrumb** – Experiences > Stadium Tours.
3. **Title** – “STADIUM TOURS” (hero medium, condensed extrabold).
4. **Image gallery** – Main video/image (343×343) + 5 thumbnails.
5. **Description** – Two paragraphs + feature badges (Digital ticket, Wheelchair accessible, In-person guide).
6. **Member discount** – “Member's discounts applied at basket” + Sign in / Register.
7. **Booking widget** – “from £22 per person”, Select date, Select participants, “Show available tours”, Free cancellation.
8. **Tour card** – “Stadium and Academy tour”, “From £20 per person”, “Most popular” / “120 mins”, “More info”.

To refresh the implementation from Figma, use the same node ID with the Figma MCP tools (`get_design_context`, `get_screenshot`, `get_variable_defs`).
