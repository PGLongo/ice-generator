# SmICE Unit Tests

Comprehensive unit test suite for the SmICE server-side encryption system, covering API routes and client-side composables.

## Test Structure

```
tests/unit/
├── composables/
│   └── useIceUrlShare.spec.ts          # Client-side encryption wrapper tests
├── server/
│   └── api/
│       ├── encrypt.spec.ts             # Encryption endpoint tests
│       └── decrypt.spec.ts             # Decryption endpoint tests
├── setup.ts                            # Global test configuration
└── README.md                           # This file
```

## Running Tests

### Run all tests once
```bash
npm run test
```

### Run tests in watch mode (auto-rerun on file changes)
```bash
npm run test:watch
```

### Run tests with coverage report
```bash
npm run test:coverage
```

### Run specific test file
```bash
npx vitest tests/unit/composables/useIceUrlShare.spec.ts
```

### Run tests matching a pattern
```bash
npx vitest -- --grep "encodeData"
```

## Test Files Overview

### 1. `/api/encrypt.spec.ts` - Encryption Endpoint Tests

Tests for `server/api/encrypt.post.ts` - Server-side AES-256-GCM encryption

**Coverage:**
- ✅ Successfully encrypt valid data
- ✅ Encryption round-trip (encrypt then decrypt)
- ✅ Invalid input handling (missing data, wrong format)
- ✅ Empty string data rejection
- ✅ Missing encryption key error
- ✅ Data size variations (small, medium, large)
- ✅ Special characters and unicode
- ✅ Random IV generation (different output each time)
- ✅ Null data handling
- ✅ Malformed request body

**Test Count: 12 tests**

**Key Scenarios:**
```typescript
// Test: Valid encryption
const testData = JSON.stringify({ n: 'John Doe', a: 5 })
const result = await encrypt(mockEvent)
// Returns: { encrypted: "iv:authTag:encryptedData" }

// Test: URL-safe format
// Format: IV (32 hex chars) : AuthTag (32 hex chars) : Encrypted data

// Test: Random IV
// Same data encrypted twice produces different results
```

### 2. `/api/decrypt.spec.ts` - Decryption Endpoint Tests

Tests for `server/api/decrypt.post.ts` - Server-side AES-256-GCM decryption

**Coverage:**
- ✅ Successfully decrypt valid encrypted data
- ✅ Decrypt complex ICE data structure
- ✅ Invalid input handling (missing field, non-string)
- ✅ Malformed encrypted data (missing parts, wrong separators)
- ✅ Corrupted data handling (wrong key, corrupted IV, auth tag, encrypted content)
- ✅ Data size variations
- ✅ Special characters and unicode preservation
- ✅ Invalid hex characters
- ✅ Empty field rejection
- ✅ Missing encryption key error

**Test Count: 18 tests**

**Key Scenarios:**
```typescript
// Test: Valid decryption
const encrypted = "iv:authTag:encryptedData"
const result = await decrypt(mockEvent)
// Returns: { data: '{"n":"John Doe","a":5}' }

// Test: Corrupted data detection
// Wrong key → 500 error
// Corrupted IV → 500 error
// Corrupted auth tag → 500 error
```

### 3. `/composables/useIceUrlShare.spec.ts` - Client-Side Encryption Composable

Tests for `app/composables/useIceUrlShare.ts` - Client-side wrapper for encryption APIs

**Coverage:**

#### serializeData (Internal Function)
- ✅ Serialize minimal data (name, age only)
- ✅ Serialize complete data with all fields
- ✅ Emergency contacts abbreviation
- ✅ School information handling
- ✅ Empty field omission
- ✅ Partial field handling

#### deserializeData (Internal Function)
- ✅ Deserialize minimal compact data
- ✅ Deserialize complete data structure
- ✅ UUID generation for contacts without IDs
- ✅ Round-trip preservation

#### encodeData()
- ✅ Successfully encode minimal data
- ✅ Successfully encode complete data
- ✅ URL-safe character replacement (+ → -, / → _, = removed, : → ~)
- ✅ API call failure handling
- ✅ Missing encrypted field in response
- ✅ Correct API request format

#### decodeData()
- ✅ Successfully decode valid encoded data
- ✅ URL-safe character restoration
- ✅ Complex data deserialization
- ✅ API failure returns null
- ✅ Missing data field returns null
- ✅ Invalid JSON returns null

#### generateShareableUrl()
- ✅ Generate URL with provided baseUrl
- ✅ Generate URL from window.location
- ✅ Handle pathname without trailing slash
- ✅ Propagate encoding errors

#### getDataFromUrl()
- ✅ Extract data from URL query parameter
- ✅ Return null when no data parameter
- ✅ Handle SSR environment (no window)
- ✅ Return null on decoding error
- ✅ Extract from URL with multiple parameters

#### copyShareableUrl()
- ✅ Successfully copy to clipboard
- ✅ Return false on clipboard failure
- ✅ Return false on URL generation failure

#### getEncodedSize()
- ✅ Calculate encoded data size
- ✅ Return 0 on encoding error
- ✅ Larger data produces larger size

**Test Count: 45 tests**

## Test Configuration

### vitest.config.ts

```typescript
{
  plugins: [vue()],
  test: {
    globals: true,           // Use global test functions
    environment: 'jsdom',    // Browser-like environment
    setupFiles: ['./tests/unit/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html']
    }
  },
  resolve: {
    alias: {
      '@': './app',
      '~': './'
    }
  }
}
```

### setup.ts

Global test setup that:
- Mocks `window` and `navigator` for browser APIs
- Provides `crypto.randomUUID()` for cross-platform support
- Mocks `$fetch` globally
- Suppresses expected console errors in tests
- Resets mocks between tests

## Data Structures Used in Tests

### Minimal IceData (for basic tests)
```typescript
{
  name: 'John Doe',
  age: 5,
  emergencyContacts: [],
  school: {}
}
```

### Complete IceData (for comprehensive tests)
```typescript
{
  name: 'Alice Smith',
  age: 8,
  dateOfBirth: '2016-03-15',
  bloodType: 'O+',
  city: 'New York',
  address: '123 Main Street',
  section: '3A',
  allergies: ['peanuts', 'shellfish'],
  medicalConditions: ['asthma'],
  currentMedications: ['albuterol'],
  medicalNotes: 'Emergency action plan on file',
  emergencyContacts: [
    {
      id: '550e8400-e29b-41d4-a716-446655440000',
      name: 'Mom',
      relationship: 'Parent',
      phone: '+1-555-123-4567',
      email: 'mom@example.com'
    }
  ],
  primaryDoctor: 'Dr. Smith',
  insuranceInfo: 'Blue Cross #123456',
  specialInstructions: 'Allergy action plan in backpack',
  school: {
    name: 'Lincoln Elementary',
    address: '456 School Ave',
    city: 'New York',
    phone: '+1-555-000-0000',
    referentPhone: '+1-555-111-2222',
    referentName: 'Ms. Johnson',
    logoUrl: 'https://example.com/logo.png',
    section: '3A'
  },
  lastUpdated: '2024-11-14T...'
}
```

## Mocking Strategy

### API Routes ($fetch)
```typescript
// Mock successful encryption
global.$fetch = vi.fn().mockResolvedValueOnce({
  encrypted: 'abc123def456'
})

// Mock API failure
global.$fetch = vi.fn().mockRejectedValueOnce(
  new Error('Network error')
)
```

### Browser APIs (window, navigator)
```typescript
// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    origin: 'https://example.com',
    pathname: '/app/',
    search: '?data=encoded123'
  },
  writable: true
})

// Mock navigator.clipboard
const mockClipboard = {
  writeText: vi.fn().mockResolvedValueOnce(undefined)
}
Object.defineProperty(navigator, 'clipboard', {
  value: mockClipboard,
  writable: true
})
```

### Environment Variables
```typescript
// Set encryption key for tests
beforeEach(() => {
  process.env.NUXT_ENCRYPTION_KEY = '0123456789abcdef...'
})

afterEach(() => {
  delete process.env.NUXT_ENCRYPTION_KEY
})
```

## Encryption Test Examples

### AES-256-GCM Format
```
IV:AuthTag:EncryptedData

- IV: 32 hex characters (16 bytes)
- AuthTag: 32 hex characters (16 bytes)
- EncryptedData: Variable length hex string

Example:
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6:z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4:abc123def456ghi789
```

### URL-Safe Encoding
```
Character replacement for URL safety:
+ → -
/ → _
= → (removed)
: → ~

Example:
Base64:   abc+def/ghi=:jkl
URL-safe: abc-def_ghi~jkl
```

## Coverage Goals

Current coverage targets:
- **Encryption API**: 100% line coverage
- **Decryption API**: 100% line coverage
- **useIceUrlShare Composable**: 100% line coverage
- **All error paths**: Covered
- **All data transformations**: Covered

## Common Testing Patterns

### Testing Async Composable Functions
```typescript
it('should encode data', async () => {
  global.$fetch = vi.fn().mockResolvedValueOnce({
    encrypted: 'data'
  })

  const { useIceUrlShare } = await import('@/composables/useIceUrlShare')
  const { encodeData } = useIceUrlShare()

  const result = await encodeData(data)
  expect(result).toBeDefined()
})
```

### Testing Error Handling
```typescript
it('should handle API failure', async () => {
  global.$fetch = vi.fn().mockRejectedValueOnce(
    new Error('Network error')
  )

  try {
    await encodeData(data)
    expect.fail('Should throw')
  } catch (error) {
    expect(error.message).toContain('Encoding failed')
  }
})
```

### Testing with Mock Events
```typescript
function createMockEvent(body: any) {
  return {
    node: { req: {} },
    readBody: vi.fn().mockResolvedValueOnce(body)
  } as any
}
```

## Debugging Tests

### Run single test
```bash
npx vitest tests/unit/composables/useIceUrlShare.spec.ts -t "encodeData"
```

### Run with detailed output
```bash
npx vitest --reporter=verbose
```

### Debug in browser
```bash
npx vitest --ui
```
Opens interactive UI at http://localhost:51204

### Watch specific file
```bash
npx vitest tests/unit/composables/useIceUrlShare.spec.ts --watch
```

## Test Maintenance

### Adding New Tests
1. Create test file following pattern: `feature.spec.ts`
2. Import necessary types and dependencies
3. Use descriptive `describe()` and `it()` names
4. Include comments explaining test purpose
5. Mock external dependencies properly
6. Clean up after tests (reset mocks, env vars)

### Updating Tests When Code Changes
1. Update mock expectations if API changes
2. Add new test cases for new functionality
3. Remove tests for removed code
4. Ensure coverage remains at 100%

### Common Issues

**Import paths not resolving:**
- Check `vitest.config.ts` alias configuration
- Verify `@` points to `app` directory

**$fetch not mocked globally:**
- Check `tests/unit/setup.ts` is configured in `vitest.config.ts`
- Ensure `beforeEach` clears mocks between tests

**Window/navigator not available:**
- Check `setup.ts` provides required mocks
- Verify test environment is `jsdom`

## Performance

- Average test execution time: ~100-200ms per test
- Total test suite: ~5-10 seconds
- Coverage report generation adds ~2 seconds

## Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Run unit tests
  run: npm run test

- name: Generate coverage
  run: npm run test:coverage

- name: Upload coverage
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/coverage-final.json
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Node.js Crypto Module](https://nodejs.org/api/crypto.html)
- [AES-256-GCM](https://en.wikipedia.org/wiki/Galois/Counter_Mode)
