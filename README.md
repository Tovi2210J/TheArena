
# �️ The Arena: Unified Agentic Playground on MCP

> **Benchmark, compete, and evolve your AI agents!**  
> The Arena is a unified platform for agentic AI workflows and game environments, all connected through the Model Context Protocol (MCP).  
> Seamlessly benchmark, orchestrate, and expand AI tool use and agentic flows in a single, extensible ecosystem.

## 🚀 What is The Arena?

The Arena leverages the Model Context Protocol (MCP) to connect AI assistants like Claude with powerful external tools and environments.  
Each server in The Arena provides unique capabilities—from solving puzzles and playing games to managing complex agentic workflows—enabling rigorous benchmarking and rapid agent evolution.


## 🎮 Featured MCP Servers

### 🧠 [Recursive Flow](recursive-flow/) - Agentic Workflow Automation

Turn your AI into an autonomous agent that can handle complex, multi-step tasks:

- **🔄 Smart Task Breaking**: Automatically decomposes complex requests into manageable steps
- **🎯 Guided Execution**: Provides systematic guidance for completing workflows
- **📊 Progress Tracking**: Maintains context and tracks completion across all steps
- **🔧 Tool Orchestration**: Coordinates multiple tools to achieve complex goals

**Perfect for:** Research projects, data analysis workflows, content creation pipelines, and automated reporting

**Quick Start:**

```bash
cd recursive-flow && npm install && npm run build && npx recursive-flow
```

---

### 🎲 [Role-Playing Game Server](role-playing-mcp-server/) - Interactive Storytelling

Transform your AI into a dynamic game master for immersive RPG experiences:

- **🌟 Dynamic Story Creation**: Generate rich, interactive narratives in any setting
- **👥 Character Management**: Track complex character stats, relationships, and development
- **🎭 Adaptive Storytelling**: Respond intelligently to player choices and actions
- **🗺️ World Building**: Create and maintain consistent game worlds

**Perfect for:** Creative writing, interactive entertainment, education through gamification, and creative brainstorming

**Quick Start:**

```bash
cd role-playing-mcp-server && npm install && npm run build && npx rpg-mcp-server
```

---

### ♟️ [Chess Game Server](chess-mcp-server/) - Strategic Gaming

Play chess with real-time visualization and intelligent move analysis:

- **🎯 Real-time Gameplay**: WebSocket-powered live chess games
- **✅ Rule Validation**: Complete chess rule enforcement and move verification
- **📱 Web Interface**: Beautiful browser-based chess board with live updates
- **🤖 AI Integration**: Let AI assistants play or analyze chess positions

**Perfect for:** Chess learning, AI vs AI matches, educational chess analysis, and strategic thinking exercises

**Quick Start:**

```bash
cd chess-mcp-server && npm install && npm run build && npm start
```

*Visit <http://localhost:3000> for the interactive web interface*

---

### 🧩 [Rubik's Cube Solver](rubiks-cube-mcp-server/) - 3D Puzzle Solving

Watch AI solve the world's most famous puzzle with stunning 3D visualization:

- **🎲 3D Visualization**: Beautiful Three.js-powered cube rendering
- **🔄 Live Updates**: Real-time move execution with WebSocket synchronization
- **🎯 Solution Detection**: Automatic completion detection with celebration effects
- **📚 Move History**: Complete tracking of all moves and cube states

**Perfect for:** Educational demonstrations, algorithm visualization, puzzle solving practice, and 3D interaction

**Quick Start:**

```bash
cd rubiks-cube-mcp-server && npm install && npm run build && npx rubiks-cube-mcp-server
```

*Visit <http://localhost:3000> for immersive 3D visualization*

## 🛠️ Quick Setup for Claude Desktop

To use any of these servers with Claude Desktop, add the appropriate configuration to your `claude_desktop_config.json`:

### macOS

```bash
~/Library/Application Support/Claude/claude_desktop_config.json
```

### Windows

```bash
%APPDATA%/Claude/claude_desktop_config.json
```

### Example Configuration

```json
{
  "mcpServers": {
    "recursive-flow": {
      "command": "npx",
      "args": ["recursive-flow"]
    },
    "rpg-game-server": {
      "command": "npx",
      "args": ["rpg-mcp-server"]
    },
    "chess-server": {
      "command": "npx",
      "args": ["chess-mcp-server"]
    },
    "rubiks-cube": {
      "command": "npx",
      "args": ["rubiks-cube-mcp-server"]
    }
  }
}
```

**💡 Pro Tip:** Start with one server to get familiar with MCP, then add others as needed!

## 🎯 Getting Started

Each server is completely self-contained with its own dependencies and setup process. Choose the one that best matches your interests:

1. **🧠 For Workflow Automation**: Start with **Recursive Flow** to experience AI handling complex, multi-step tasks
2. **🎮 For Creative Projects**: Try the **RPG Server** for dynamic, interactive storytelling adventures
3. **♟️ For Strategic Gaming**: Explore **Chess Server** for competitive gameplay and analysis
4. **🧩 For Visual Problem-Solving**: Experience **Rubik's Cube** for immersive 3D puzzle solving

## 🔗 Links & Resources

- 📖 [Model Context Protocol Documentation](https://modelcontext.com/)
- 🏠 [Claude Desktop](https://claude.ai/desktop) - Primary AI assistant for MCP
- 💡 Each server directory contains detailed setup instructions and examples

## 🤝 Contributing

Each server is actively maintained and welcomes contributions! Check individual server directories for specific contribution guidelines.

## 📄 License

See individual server directories for license information.

---

## 🗺️ Roadmap

### ✅ 2025 First Half

- Unified MCP server architecture and monorepo transition
- Core functionality completion and deployment automation for all servers
- License standardization and comprehensive documentation

### 🚧 2025 Second Half

- New game servers optimized for reinforcement learning (RL) and AI experimentation
  - Examples: Sokoban, 2048, Sliding Puzzle, and other turn-based puzzle environments
- Integrated dashboard and monitoring system across all servers
- Enhanced integration with Claude Desktop and other AI platforms
- Expanded examples and comprehensive tutorials

### 💡 Future Ideas & Proposals

- Custom game/puzzle server template framework
- Multiplayer and collaborative game server support
- Automated RL environment benchmarking tools
- Advanced agentic flow analytics and performance metrics

> **Contributions and suggestions are always welcome! Please submit issues or pull requests.**
