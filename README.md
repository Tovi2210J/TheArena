# 🎯 MCP Server Collection

> **Supercharge your AI with specialized tools!** This collection features cutting-edge Model Context Protocol (MCP) servers that transform AI assistants into powerful, specialized agents capable of complex tasks, interactive gaming, and intelligent automation.

## 🚀 What is This?

The Model Context Protocol (MCP) allows AI assistants like Claude to use external tools and services. Each server in this collection provides unique capabilities that extend what your AI can do - from solving puzzles and playing games to managing complex workflows automatically.

## 🎮 Featured Servers

### 🧠 [Recursive Flow](recursive-flow/) - AI Workflow Automation

Turn your AI into an autonomous agent that can handle complex, multi-step tasks:

- **🔄 Smart Task Breaking**: Automatically decomposes complex requests into manageable steps
- **🎯 Guided Execution**: Provides systematic guidance for completing workflows
- **📊 Progress Tracking**: Maintains context and tracks completion across all steps
- **🔧 Tool Orchestration**: Coordinates multiple tools to achieve complex goals

Perfect for: Research projects, data analysis workflows, content creation pipelines, automated reporting

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

Perfect for: Creative writing, interactive entertainment, education through gamification, creative brainstorming

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

Perfect for: Chess learning, AI vs AI matches, educational chess analysis, strategic thinking exercises

**Quick Start:**

```bash
cd chess-mcp-server && npm install && npm run build && npm start
```

_Visit <http://localhost:3000> for the web interface_

---

### 🧩 [Rubik's Cube Solver](rubiks-cube-mcp-server/) - 3D Puzzle Solving

Watch AI solve the world's most famous puzzle with stunning 3D visualization:

- **🎲 3D Visualization**: Beautiful Three.js-powered cube rendering
- **🔄 Live Updates**: Real-time move execution with WebSocket synchronization
- **🎯 Solution Detection**: Automatic completion detection with celebration effects
- **📚 Move History**: Complete tracking of all moves and cube states

Perfect for: Educational demonstrations, algorithm visualization, puzzle solving practice, 3D interaction

**Quick Start:**

```bash
cd rubiks-cube-mcp-server && npm install && npm run build && npx rubiks-cube-mcp-server
```

_Visit <http://localhost:3000> for 3D visualization_

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

Each server is completely self-contained with its own dependencies and setup. Choose the one that interests you most:

1. **🧠 For Automation Enthusiasts**: Start with **Recursive Flow** to see AI handle complex workflows
2. **🎮 For Creative Minds**: Try the **RPG Server** for interactive storytelling adventures
3. **♟️ For Strategy Lovers**: Jump into **Chess Server** for competitive gameplay
4. **🧩 For Visual Learners**: Experience **Rubik's Cube** for 3D puzzle solving

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

### ✅ 2025 상반기

- MCP 서버 구조 통합 및 모노레포 전환
- 각 서버별 기본 기능 완성 및 배포 자동화
- 라이선스 및 문서 정비

### 🚧 2025 하반기

- 강화학습(RL) 및 AI 실험에 적합한 신규 게임 서버 추가
  - 예: Sokoban, 2048, Sliding Puzzle 등 턴베이스 퍼즐류
- 서버 간 통합 대시보드 및 모니터링 기능
- Claude Desktop 및 기타 AI 플랫폼과의 연동 강화
- 예제 및 튜토리얼 확장

### 💡 아이디어/제안

- 사용자 정의 게임/퍼즐 서버 템플릿 제공
- 멀티플레이/협동형 게임 서버 지원
- RL 환경 벤치마크 자동화 도구

> **기여/제안은 언제든 환영합니다! Issue 또는 PR로 남겨주세요.**
