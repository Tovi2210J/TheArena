# TheArena — Agentic Playground for AI Benchmarking & Games

[![Releases](https://img.shields.io/badge/Releases-v1.0-blue?logo=github)](https://github.com/Tovi2210J/TheArena/releases)

![TheArena banner](https://images.unsplash.com/photo-1542831371-d531d36971e6?auto=format&fit=crop&w=1400&h=400&q=60)

Unified agentic playground for AI benchmarking, workflow automation, and game environments using the Model Context Protocol (MCP). TheArena hosts agentic flow servers, RPG engines, a chess server, and a Rubik’s Cube environment. It supports Claude as an evaluation and agent backend.

Topics: ai-playground, automation, chess-game, curated-list, games, mcp, mcp-server, playground, rpg-game, rubiks-cube, workflow

Release files: download and run the latest build from https://github.com/Tovi2210J/TheArena/releases — fetch the release archive or installer and execute the included binary or script to install local servers.

---

Table of contents
- What is TheArena
- Key features
- Architecture
- Quick start
- Servers and environments
  - Agentic flow server
  - RPG server
  - Chess server
  - Rubik’s Cube server
- Model Context Protocol (MCP)
- Claude integration
- Examples
  - Agent benchmark run
  - RPG scenario run
  - Chess match harness
  - Rubik’s Cube solver test
- CLI and API
- Deployment
- Contribute
- License
- Releases and downloads
  - Important: download and execute release file

What is TheArena
TheArena is a single repo that hosts multiple agentic and game servers. It provides test beds for agent benchmarking, automated workflows, and interactive games. Each server implements MCP. You can run a controlled benchmark, test a chain of agents, or spin up a game instance for user play or automated playtesting.

Key features
- MCP-based messaging for agent and model interactions.
- Agent orchestration for multi-turn flows and workflows.
- RPG engine with stateful scenes, NPCs, items, and scripted encounters.
- Chess server with PGN export, ELO tracking, and move validation.
- Rubik’s Cube environment with standard scrambles and solver hooks.
- Claude integration for model-driven agents and evaluation.
- REST and WebSocket APIs for local and remote automation.
- Docker-ready services and sample Compose files.
- Test suites and benchmark harnesses.

Architecture
![Architecture diagram](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&h=400&q=60)

The system splits into components:
- MCP Core: message routing, context tracking, metadata, and event logs.
- Server adapters: each environment implements an MCP adapter.
- Agent manager: spins agents, routes messages, manages lifecycle.
- Integrations: connectors for Claude and other model endpoints.
- CLI: local control and test runners.
- UI (optional): example browser client and visualizers.

Quick start — local dev
1. Clone the repo.
2. Build or pull the release. Download and execute the release file from the releases page: https://github.com/Tovi2210J/TheArena/releases
3. Start the MCP core:
   - Use Docker: docker-compose up -d mcp-core
   - Or run the binary: ./thearena-mcp-core
4. Start a server:
   - Agentic flow: ./thearena-agent-server
   - Chess: ./thearena-chess-server
   - Rubik’s Cube: ./thearena-cube-server
5. Use the CLI to create a session:
   - thearena session create --type chess --mode automated
6. Inspect logs in ./logs.

Servers and environments

Agentic flow server
- Host multi-agent workflows.
- Support for pipelines, branching flows, and breakpoints.
- Load scenarios from JSON or YAML.
- Example use: benchmark a question-answering chain, measure latency and correctness.

RPG server
![RPG image](https://images.unsplash.com/photo-1526318472351-c75fcf07026e?auto=format&fit=crop&w=1200&h=400&q=60)
- Stateful scenes with persistent world state.
- NPC agent hooks that consume MCP messages.
- Scripted quests and random encounters.
- Use it for agent role-play testing, world-building, and interactive narratives.

Chess server
![Chess image](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&h=400&q=60)
- FEN and PGN support.
- Move validation and rules engine.
- Match runner for agent vs agent or agent vs human.
- ELO tracking and match history.

Rubik’s Cube server
![Rubik's Cube image](https://upload.wikimedia.org/wikipedia/commons/5/5a/RubiksCube.JPG)
- Standard cube state representation.
- Scramble generator and solver hooks.
- Time trials and solver accuracy metrics.

Model Context Protocol (MCP)
MCP is a message-layer protocol for model-context exchange. It defines:
- Context objects that carry conversation history, metadata, and signals.
- Message types: prompt, response, action, observation, event.
- Hooks for state persistence and checkpoints.
- Ability to route messages between models, agents, and environments.

MCP examples
- Send a prompt:
```json
{
  "type": "prompt",
  "context": {"session": "abc123", "turn": 4},
  "payload": {"text": "You are a Dungeon Master. Describe the next room."}
}
```
- Receive response:
```json
{
  "type": "response",
  "context": {"session": "abc123", "turn": 4},
  "payload": {"text": "You enter a hall lit by flickering torches..."}
}
```

Claude integration
TheArena supports Claude as a model backend. You can:
- Route prompts to Claude for narrative generation.
- Use Claude agents in multi-agent benchmarks.
- Configure Claude keys in the integrations file.

Example config (config/integrations.yaml):
```yaml
claude:
  enabled: true
  api_key: "YOUR_CLAUDE_API_KEY"
  endpoint: "https://api.claude.ai/v1"
```

Examples

Agent benchmark run
1. Start MCP and agent server.
2. Load benchmark scenario: benchmarks/qna-chain.yaml
3. Run:
   - thearena bench run qna-chain --agents 3 --iterations 100
4. View metrics in ./bench/results.json

RPG scenario run
1. thearena session create --type rpg --scenario "lost-temple"
2. thearena session start --id <session-id>
3. Watch logs or connect a UI.

Chess match harness
1. thearena match create --type chess --white agent-alpha --black agent-beta
2. thearena match watch --id <match-id>
3. Export PGN:
   - thearena match export --id <match-id> --format pgn > game.pgn

Rubik’s Cube solver test
1. thearena cube scramble --seed 42 --moves 25
2. thearena cube solve --solver my-solver --session <id>
3. Collect time and move count.

CLI and API
- CLI provides session, server, match, and bench commands.
- REST API exposes endpoints:
  - POST /mcp/send
  - GET /sessions/{id}
  - POST /sessions/{id}/action
- WebSocket API streams events for live sessions.

Deployment
- Docker: use docker-compose.yml in /deploy.
- Kubernetes: use manifests in /deploy/k8s.
- For production, run MCP core behind an authenticated gateway and enable TLS.
- Use environment variables for API keys and endpoints.

Contribute
- Fork the repo.
- Create a branch for your feature.
- Write tests and add docs.
- Open a pull request with a clear description and test steps.
- Follow the code style in CONTRIBUTING.md.

Project layout
- /cmd — binaries
- /internal — core libraries
- /servers — agent, chess, rpg, cube
- /deploy — Docker and k8s files
- /bench — benchmark scenarios
- /docs — API and MCP spec
- /examples — sample flows and scripts

Troubleshooting
- Check logs in ./logs for errors.
- Verify MCP core is running before starting servers.
- Confirm integration API keys are present in config/integrations.yaml.
- If servers fail to bind, ensure ports are free or change them in config.

Roadmap
- Add live web UI for session control.
- Add support for more model backends.
- Improve match analysis and visualization.
- Add scripted tournaments and benchmark leaderboards.

Security
- Store keys in environment variables or a secret manager.
- Run model integrations in separate network zones when possible.
- Rotate API keys regularly.

License
TheArena uses the MIT license. See LICENSE.md.

Releases and downloads
[![Download Releases](https://img.shields.io/badge/Download_Releases-Visit%20Page-orange?logo=github)](https://github.com/Tovi2210J/TheArena/releases)

Important: the releases page includes build artifacts. Download and execute the release file appropriate for your platform. If the link does not work for you, check the Releases section on the repository page.

Contact
- Issues: open an issue on GitHub.
- Discussions: use the Discussions tab for feature topics.
- PRs: open a pull request against main.

Find the current release and assets here: https://github.com/Tovi2210J/TheArena/releases

<!-- End of README -->