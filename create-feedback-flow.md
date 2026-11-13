
# Client Feedback Flow (`/create-feedback`)

## 1. App Shell

- **RootLayout** – Renders the Navbar and the routed page.
- **CreateFeedback** – Wraps the feedback flow in `FeedbackProvider` and renders `FeedbackFlow`.

## 2. Feedback Steps

The `FeedbackFlow` component displays one step at a time in the following order:

1. `DearClientForm`
2. `VerifyQueueForm`
3. `RespondentProfileForm`
4. `ServiceAssessmentForm`
5. `AffiliationForm`
6. `AgeGroupForm`
7. `AddressForm`
8. `EmploymentStatusForm`
9. `ServiceRatingForm`
10. `OtherSuggestionForm` – Contains the final Submit button.

## 3. Shared or Nested UI Components

- **CsfFormUI** – Wraps each feedback step.
- **Input** – Used across several steps for user input.
- **Select** – Used for address-related choices.
- **ErrorText** – Displays validation messages and errors.
- **PSGCDropdown** – Appears in `AddressForm` only when the client selects "Outside Solano." It uses an internal loading component and the shared `Input` and `Select` components.
- **Toaster** – A global component that displays the submission result.

## 4. Non-Component Logic

The following hooks and functions handle the flow's underlying operations:

- **useVerifyQueue** – Verifies the ticket during Step 2.
- **usePsgcDropdownHook** – Manages the external-address dropdowns.
- **useSubmitFeedback** – Handles the submission of the completed feedback form.
