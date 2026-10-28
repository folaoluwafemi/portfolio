---
name: create-agent-skill
description: A blueprint and meta-instruction explaining how coding agents can create and package high-fidelity, modular, standalone agent skills.
metadata:
  version: "1.1.0"
  author: Antigravity
  specification: "Open Agent Skills v1.0"
---

# 🛠️ How to Create an Agent Skill

This skill acts as a meta-instruction blueprint for coding agents. It defines the strict folder layout, metadata tags, progressive disclosure pattern, and the **"show, don't tell"** design principles required to create new high-fidelity standalone agent skills in this repository. Adhering to this standard ensures all future AI-driven modifications remain predictable, context-efficient, and structurally clean.

---

## 📂 Folder Layout

Every skill must be packaged inside its own self-contained directory under `.agents/skills/`. The folder name must match the lowercase, hyphenated `name` parameter declared in the `SKILL.md` frontmatter.

A complete, high-fidelity skill conforms to the following layout:

```text
.agents/skills/
└── <skill-name>/
    ├── SKILL.md             # REQUIRED: Frontmatter metadata & instructions
    ├── scripts/             # OPTIONAL: Deterministic execution code (JS, TS, Python, etc.)
    ├── references/          # OPTIONAL: Schemas, reference APIs, or policies
    ├── examples/            # OPTIONAL: Realistic code or UI visual mockups
    └── assets/              # OPTIONAL: Static assets, diagrams, or wireframes
```

---

## 📝 The `SKILL.md` Specification

The `SKILL.md` file serves as the main entry point. To implement **Progressive Disclosure** (preventing context bloat), the agent initially reads only the YAML frontmatter of all skills. The full body is only parsed and loaded into active context when the agent encounters a task matching the skill's `description`.

### 1. YAML Frontmatter Requirements
Every `SKILL.md` must start with a valid YAML frontmatter block containing:
- `name`: Matches the parent directory name exactly (lowercase, numbers, hyphens).
- `description`: The clear trigger condition defining *when* and *why* a future agent should activate this skill.
- `metadata`: A dictionary tracking versions, author, and standards.

### 2. "Show, Don't Tell" Document Body
The markdown body must avoid abstract hand-waving or generic guidelines. It should prioritize high-fidelity, copy-pasteable assets, clear architectural visual flows, and exact TypeScript models.

#### Structure of the Body:
1. **Goal / Context**: Explain the precise engineering problem this skill solves.
2. **The Repeating Pattern**: Outline the architecture, API models, and constraints (e.g., camelCase in TS, snake_case in Database queries).
3. **High-Fidelity Code Blueprint**: Real, complete code samples, fully annotated, demonstrating the pattern in action.
4. **Validation checklist**: How the agent can verify the skill is executed correctly (tests, lint rules, console checkpoints).

---

## 🚀 Step-by-Step Skill Creation Guide

When you identify a repeating pattern or design philosophy in the codebase that needs to be preserved, follow these steps to build and register the new skill:

### Step 1: Initialize the Skill Directory
Create a dedicated folder within `.agents/skills/`:
```powershell
mkdir ".agents/skills/my-new-architectural-skill"
```

### Step 2: Formulate the Trigger Description
Craft a highly precise description. This is used by the LLM system to determine if the skill is relevant.
- *Poor*: "Helpful React components"
- *Excellent*: "Triggers when implementing real-time web socket channels or setting up Supabase subscriptions in Zustand stores. Prevents memory leaks by enforcing explicit cleanups."

### Step 3: Write the `SKILL.md` with High-Fidelity Examples
Use the standard template below to write the file. Be sure to provide *exact*, working TypeScript and React Native patterns rather than pseudocode.

---

## 📋 Standard Skill Template

Use this markdown template as a starting point for any new `SKILL.md` file:

```markdown
---
name: name-of-the-skill
description: Triggers when [describe the exact technical trigger condition].
metadata:
  version: "1.0.0"
  author: harpenin-developer-agent
---

# 🎯 Skill Title (e.g., Swipe Matchmaking State Machine)

Brief explanation of the technical problem, context, and why this design pattern is critical.

## 📐 The Repeating Pattern

Detailed walkthrough of the architectural constraints, naming conventions (e.g., Flutter parity, DB snake_case), and file paths.

## 💻 High-Fidelity Code Blueprint

```typescript
// Path: src/features/feature_name/presentation/components/MyComponent.tsx
// Complete, annotated, production-grade example here...
```

## 🧪 Verification & Checklist
- [ ] Checklist item 1 (e.g., Verify no memory leaks on unmount)
- [ ] Checklist item 2 (e.g., Check React Native Web compatibility)
```

---

## 🎨 High-Fidelity Example: "Pulsing Status Beacon"

To demonstrate the **"Show, Don't Tell"** standard, look at the directory structure and file contents of the `pulsing-status-beacon` skill:

### Directory structure:
```text
.agents/skills/pulsing-status-beacon/
└── SKILL.md
```

### SKILL.md Body contents:
This is how a standalone folder skill looks:
```markdown
---
name: pulsing-status-beacon
description: Triggers when rendering live session rooms, active channels, or online indicators.
metadata:
  version: "1.0.0"
---

# 🚨 Pulsing Status Beacon

Renders a glowing, pulsating notification dot to indicate live focus (e.g., live stage events, active channels).

## 📐 The Repeating Pattern
1. **Pulse Animation**: Use standard React Native `Animated` or Reanimated loops.
2. **Native Threading**: Always run animations on native drivers (`useNativeDriver: true`) to bypass the JS thread.

## 💻 High-Fidelity Code Blueprint

```typescript
import React, { useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

export const PulsingBeacon = () => {
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 0.4, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 1.0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, [pulse]);

  return (
    <Animated.View style={[styles.beacon, { opacity: pulse }]}>
      <View style={styles.innerDot} />
    </Animated.View>
  );
};
...
```

By packaging skills in folders like `pulsing-status-beacon/` or `create-agent-skill/` rather than placing all patterns into a single text document, agents can easily find, edit, and use modular extensions as distinct components!
