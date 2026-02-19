# Fix Figma MCP – See Your Selected Frame in Cursor

Your Cursor is already configured to use the Figma MCP server. To get "click a frame and Cursor knows" working again:

## 1. Enable the MCP server in Figma

1. Open the **Figma desktop app** (not the browser).
2. Go to **Figma** menu (top-left) → **Preferences**.
3. Find **Enable local MCP server** (or similar) and turn it **on**.
4. You should see a message that the server is running at `http://127.0.0.1:3845/mcp`.

## 2. Keep Figma open

The MCP server runs inside Figma. Figma must be open while you use Cursor.

## 3. Restart Cursor

1. Quit Cursor completely (Cmd+Q on Mac).
2. Reopen Cursor.
3. This ensures it connects to the Figma MCP server.

## 4. Select in Figma, then ask in Cursor

1. In Figma: click the frame or component you care about.
2. In Cursor: ask something like *"Implement this design from Figma"* or *"What’s selected in Figma?"*
3. With no node ID given, the `get_design_context` and `get_screenshot` tools use your **current selection**.

## Requirements

- **Figma plan**: Dev Mode needs a Professional, Organization, or Enterprise plan with a Dev or Full seat.
- **Figma desktop app**: Use the app, not the web version.

## If it still doesn’t work

- Confirm Figma Preferences → MCP is enabled.
- Confirm Figma is open before starting a Cursor chat.
- Check your Cursor MCP config at `~/.cursor/mcp.json` – it should have:
  ```json
  {
    "mcpServers": {
      "Figma": {
        "url": "http://127.0.0.1:3845/mcp",
        "headers": {}
      }
    }
  }
  ```
- Restart Cursor again after any config changes.
