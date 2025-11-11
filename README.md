# Instructions to Candidates

- You have **90 minutes** to complete 1 design question
- Use any LLM or AI coding assistant of your choice to help you build the application
- Your goal is to have the application running locally in your IDE
- Be creative about how you want to demo your application to the interviewer

# Boostly — boost morale, one kudos at a time

Build a working application that enables college students to recognize their peers, allocate monthly credits, and redeem earned rewards. The platform should encourage appreciation and engagement across student communities — a simple, transparent system for celebrating contributions and converting recognition into tangible value.

Use any language, framework, or database (e.g., Flask/FastAPI, Express, Spring Boot, Django, Go, etc.) of your choice.

## Core Functionality

### 1. Recognition
Allows one student to recognize another and transfer a certain number of credits.

**Business Rules:**
- Each student receives **100 credits every month** (reset at the start of each calendar month)
- Students **cannot send credits to themselves** (self-recognition is not allowed)
- Each student has a **monthly sending limit of 100 credits** (per calendar month)
- A student cannot send more credits than they currently have in their balance
- A student cannot exceed their monthly sending limit

### 2. Endorsements
Enables students to endorse an existing recognition entry (like/cheer).

**Business Rules:**
- Each endorser can endorse a recognition entry **only once**
- Endorsements are just a count — they don't affect credit balances or any other functionality

### 3. Redemption
Lets students redeem the credits they've received.

**Business Rules:**
- Credits are converted into a fixed-value voucher at **₹5 per credit**
- When credits are redeemed, they are **permanently deducted** from the student's balance
- A student can only redeem credits they have received

## Deliverables

### Folder Structure
Organize your submission using the following folder structure:

```
your-branch/
├── src/                    # All source code goes here (including src/readme.md)
├── prompt/                 # LLM chat exports go here
├── test-cases/            # Test cases and test documentation go here
└── README.md              # Project documentation
```

### Required Files

1. **Complete source code** in the `src/` folder

2. **readme.md** in the `src/` folder with:
   - Setup instructions
   - Run instructions
   - API endpoints documentation
   - Sample requests and responses


3. **LLM Chat Export** in the `prompt/` folder:
   - If you used LLMs/AI assistants, export or save a copy of all prompts and conversations
   - Can be in any format: text file, markdown, JSON, screenshots, etc.

4. **Test Cases** in the `test-cases/` folder:
   - Document how to run your test cases
   - Can be a text file, markdown, script, or any format you prefer
   - Include instructions on how to execute the tests

---

# How to Submit Your Assignment

Follow these steps to submit your completed assignment:

1. **Create a branch** with the following naming format:
   ```
   firstname-lastname-collegeid
   ```
   Example: `john-doe-2024CS001`

2. **Organize your files** according to the folder structure specified in the Deliverables section:
   - Place all source code in the `src/` folder
   - Place LLM chat exports in the `prompt/` folder
   - Place test cases in the `test-cases/` folder

3. **Ensure all required files** are included:
   - Complete source code in `src/`
   - `src/readme.md` with setup, run instructions, and API documentation
   - Sample requests (cURL/Postman) with example responses
   - LLM chat exports in `prompt/` (if applicable)
   - Test cases documentation in `test-cases/`

4. **Verify your application** runs locally and is ready to demo

5. **Commit and push** your branch to the repository

6. **Ensure your branch** is up to date and all files are committed

---

***Remember: You are using LLMs and they hallucinate. Your ability to explain the code, think logically, and design effectively will be the key focus.***

***Good Luck!***
