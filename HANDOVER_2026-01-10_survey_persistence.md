# Handover: Survey Progress Persistence

## Status Overview
**Goal**: Save survey progress to `localStorage` and recover it on page reload (fetching from backend).
**Current State**:
- **Backend**: `/api/survey/state/:submissionId` is implemented and verified.
- **Frontend**: `SurveyContext.jsx` has the persistence logic (state restoration) but it is **DISABLED** (commented out) and `isRestoring` defaults to `false`.
- **UI**: `FateFlixSurvey.jsx` has safety checks added to `ProgressBar` and `CurrentSection` to prevent white-screen crashes if data is missing.

## Error Analysis (What went wrong)
The previous attempts failed due to **execution errors**, not logic errors.
1.  **Sed Abuse**: Used `sed` with line ranges to edit complex files. This led to:
    -   Truncating `SurveyContext.jsx` (cutting off the `setSubmissionId` function).
    -   Duplicating component definitions in `FateFlixSurvey.jsx` (putting `SurveyContent` inside itself).
    -   Missing `return` statement in `ProgressBar`.
2.  **Blind Edits**: Edited files without reading the full context first, leading to duplicate variable declarations (`isRestoring`).
3.  **Context-Blind Injection**: The latest error (`Unexpected token` at line 62) was caused by injecting a `const` declaration inside a JSX `return (...)` block. This happened because I used `sed` to replace a block of code based on line numbers without verifying what surrounded those lines, resulting in:
    ```javascript
    return (
       ...
       const { currentSection } = useSurvey(); // INVALID: const inside JSX
       ...
    )
    ```
4.  **Lack of Verification**: Did not verify file syntax (brace matching) before asking the user to run the code.

## Task Complexity: High
This task is deceptively simple but high-risk because it touches the core state machine (`SurveyContext`) and the main rendering loop (`FateFlixSurvey`).
-   **State Synchronization**: `localStorage` <-> `React State` <-> `Backend API`.
-   **Race Conditions**: `useEffect` for restoration vs. `useEffect` for result loading.
-   **UI State**: Need to handle "loading" states to prevent the survey from flashing "Section 1" before jumping to "Section 5".

## File Map
-   **Backend Endpoint**: `astro-backend-clean-main/server.js` (Search for `/api/survey/state/:submissionId`)
-   **Frontend State**: `fateflix-frontend/src/context/SurveyContext.jsx`
    -   *Logic:* `setSubmissionId` (syncs to localStorage), `restoreSession` (fetches from API).
-   **Frontend UI**: `fateflix-frontend/src/components/FateFlixSurvey.jsx`
    -   *Components:* `SurveyContent` (manages loading state), `CurrentSection` (renders questions).

## Guardrails for Next Agent (CRITICAL)
1.  **NO `sed` for Logic**: Do **NOT** use `sed` to edit React components or functions. Use `replace_file_content` (for small, precise replacements) or `rewrite_file` (if the file is small enough).
2.  **Read First**: Always read the *entire* target file before editing to ensure you aren't duplicating variables or breaking imports.
3.  **Verify Braces**: After any edit, read the file again to visually verify that all braces `{}` and parentheses `()` are balanced.
4.  **Step-by-Step Enablement**:
    -   First, verify the app runs with persistence **disabled** (current state).
    -   Uncomment the `restoreSession` logic in `SurveyContext.jsx` CAREFULLY.
    -   Verify that `setSubmissionId` is correctly caching the ID.

## Next Steps
1.  Start the frontend: `npm run dev` (Backend `npm start` is already running).
2.  Verify the app loads (it should show the survey or "Loading sections").
3.  Go to `SurveyContext.jsx`:
    -   Change `isRestoring` default to `true`.
    -   Uncomment the `restoreSession` call in `useEffect`.
    -   **Verify syntax** before saving.
4.  Test persistence: Answer questions -> Reload -> Confirm restoration.
