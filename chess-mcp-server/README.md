# Chess MCP Server

> **Chess MCP Server**는 [Model Context Protocol (MCP)](https://modelcontext.com/)를 기반으로 체스 게임을 제공하는 Node.js 서버입니다. 이 서버는 Express와 WebSocket을 사용하여 실시간 체스 게임 기능을 지원하며, `@modelcontextprotocol/sdk`를 통해 MCP와 통신합니다.

## 주요 기능

- 실시간 체스 게임 관리 (WebSocket 기반)
- MCP 프로토콜 지원
- 체스 규칙 검증 및 게임 상태 관리

## 설치 및 실행 방법

```bash
npm install
npm run build
npm start
```

## MCP 서버 등록 방법

### Claude Desktop 설정

Claude Desktop의 `claude_desktop_config.json` 파일에 다음과 같이 설정합니다:

```json
{
  "mcpServers": {
    "chess-mcp-server": {
      "command": "npx",
      "args": ["chess-mcp-server"]
    }
  }
}
```

또는 로컬에서 개발 중인 경우:

```json
{
  "mcpServers": {
    "chess-mcp-server": {
      "command": "node",
      "args": ["dist/app.js"],
      "cwd": "/path/to/chess-mcp-server"
    }
  }
}
```

> **참고:** MCP 서버는 기본적으로 3000번 포트에서 실행됩니다. 포트 변경 시 `src/app.ts` 또는 환경 변수에서 포트를 수정하세요.

## 개발 정보

- TypeScript 기반
- 주요 의존성: express, ws, chess.js, @modelcontextprotocol/sdk, zod

---
