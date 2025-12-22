# Gmail Label Service

A Spring Boot service that authenticates with the **Google Gmail API** using OAuth 2.0 and allows access to Gmail label operations.

This project is currently configured for **local development** using Google OAuth credentials stored outside of version control.

---

## Tech Stack

- Java 17+
- Spring Boot
- Google Gmail API
- Google OAuth 2.0
- Maven

---

## Prerequisites

- Java 17 or newer
- Maven
- A Google account
- Access to Google Cloud Console

---

## Google Cloud Setup (OAuth)

### 1. Create a Google Cloud Project

1. Go to **Google Cloud Console**
2. Create a new project (or use an existing one)

---

### 2. Enable the Gmail API

1. Navigate to **APIs & Services → Library**
2. Search for **Gmail API**
3. Click **Enable**

---

### 3. Configure OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. Choose **External**
3. Fill in required fields:
   - App name
   - User support email
   - Developer contact email
4. Add the scope:
   `https://www.googleapis.com/auth/gmail.labels`
5. Save and continue

> ⚠️ While in _Testing_ mode, only approved test users can authenticate.

---

### 4. Create OAuth Credentials

1. Go to **APIs & Services → Credentials**
2. Click **Create Credentials → OAuth client ID**
3. Choose **Web application**
4. Add redirect URI: `http://localhost:8080/api/v1/google/oauth/callback`
5. Download the JSON file

---

## Local Configuration

### Credentials Files

This project uses **two credential files**:

| File                              | Purpose                  | Tracked by Git |
| --------------------------------- | ------------------------ | -------------- |
| `google-credentials.example.json` | Template / documentation | ✅ Yes         |
| `google-credentials.json`         | Real OAuth credentials   | ❌ No          |

---

### Add Your Credentials

Copy the example file:

```bash
cp src/main/resources/google-credentials.example.json \
src/main/resources/google-credentials.json
```

Then replace the placeholder values with the contents of the OAuth JSON file you downloaded from Google Cloud.

**NOTE:**

- OAuth tokens are stored locally and **should not be committed**
- This setup is intended for development/testing

### Running the Application

```bash
mvn spring-boot:run
```

The application will start on:

```
 http://localhost:8080
```

### OAuth Flow

1. Hit the authorization endpoint in your browser
2. Sign in with Google
3. Grant Gmail permissions
4. Google redirects back to the application
5. OAuth tokens are stored locally in the tokens/ directory

If successful, you will see:

```
OAuth successful ✅ You can close this window.
```
