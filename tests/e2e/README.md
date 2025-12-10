# CareCard Cypress Screenshot Testing

This directory contains Cypress end-to-end tests specifically designed to capture screenshots of the CareCard application at various resolutions for documentation and visual testing purposes.

## Overview

The screenshot tests cover all main pages of the CareCard application:
- Landing page (`/`)
- Form page (`/form`) with filled sample data
- Preview page (`/preview`)
- School card page (`/school`)

## Test Resolutions

Screenshots are captured at three standard resolutions:
- **Mobile**: 375x667 (iPhone SE)
- **Tablet**: 768x1024 (iPad)
- **Desktop**: 1440x900 (Standard laptop)

## Prerequisites

1. Ensure the Nuxt development server is running:
   ```bash
   npm run dev
   ```

2. The app should be accessible at `http://localhost:3000`

## Running Screenshot Tests

### Headless Mode (Recommended for Screenshots)
```bash
npm run cypress:screenshots
```

### Interactive Mode (for Development)
```bash
npm run cypress:open
```

## Test Structure

### Files
- `cypress.config.ts`: Main Cypress configuration
- `tests/e2e/support/e2e.ts`: Support file with viewport definitions
- `tests/e2e/support/commands.ts`: Custom Cypress commands
- `tests/e2e/specs/carecard-screenshots.cy.ts`: Main screenshot test specification

### Custom Commands

#### `cy.fillSmiceForm()`
Automatically fills all form fields with realistic sample data:
- Personal Information (Mario Rossi, 35 years, A+, Milano, Via Roma 123)
- Medical Information (allergies: Penicillina/Polline, conditions: Diabete tipo 2, medications: Metformina 500mg)
- Emergency Contacts (Anna Rossi, Moglie, +39 333 1234567)
- Additional Information (Dr. Giovanni Bianchi, insurance info, emergency instructions)
- School Information (real data from Istituto Contubernio D'Albertis, Genova)

#### `cy.fillSchoolInfo()`
Fills school information section with real data from Genova:
- School Name: "Istituto Scolastico Paritario Contubernio D'Albertis Scuola dell'infanzia"
- Address: "Via Amarena 11, Genova"
- Phone: "010 503306"
- Referent: "Maestra Valentina" (+39 3206290224)
- Section: "BLU"

#### `cy.takeResponsiveScreenshots(name)`
Captures screenshots at all three resolutions with consistent naming:
- `{name}-mobile.png`
- `{name}-tablet.png`
- `{name}-desktop.png`

## Output

Screenshots are saved in `tests/e2e/screenshots/` with descriptive names:

### Individual Page Tests
- `01-landing-page-{resolution}.png`
- `02-form-filled-{resolution}.png`
- `03-preview-page-{resolution}.png`
- `04-school-card-{resolution}.png`

### Complete User Flow
- `flow-01-landing-{resolution}.png`
- `flow-02-form-completed-{resolution}.png`
- `flow-03-preview-{resolution}.png`
- `flow-04-school-{resolution}.png`

## Usage Notes

1. **Clean State**: Each test starts with cleared localStorage to ensure consistent results
2. **Wait Times**: Tests include appropriate waits for animations and data loading
3. **Form Validation**: The `fillSmiceForm()` command handles Nuxt UI component selectors properly
4. **Language**: Tests are configured for Italian interface (`it` locale)

## Troubleshooting

### Common Issues

1. **Server Not Running**: Ensure `npm run dev` is active before running tests
2. **Selector Issues**: If form filling fails, check component selectors in `commands.ts`
3. **Timing Issues**: Increase wait times in test specs if elements aren't loading properly

### Updating Selectors

If form components change, update the selectors in `tests/e2e/support/commands.ts`:
- Use `[name="fieldName"] input` for UInput components
- Use `[name="fieldName"] textarea` for UTextarea components  
- Use `[name="fieldName"] button` for USelectMenu components

## Integration with Development

These tests serve multiple purposes:
1. **Documentation**: Visual proof of application functionality
2. **Regression Testing**: Detect visual changes across updates
3. **Responsive Design**: Verify layout works across all device sizes
4. **User Journey**: Validate complete application workflow