/**
 * Translates API errors to user-friendly messages
 * Handles both axios errors and custom error objects
 */

export const getErrorMessage = (error) => {
  // Handle axios error response
  if (error?.response) {
    const status = error.response.status;
    const data = error.response.data;
    const message = data?.message;

    // Auth-related errors
    if (status === 401) {
      return 'Invalid email or password.';
    }

    // User already exists
    if (status === 409) {
      if (message?.toLowerCase().includes('user')) {
        return 'An account with this email already exists. Please log in or use a different email.';
      }
      return 'This resource already exists.';
    }

    // Validation errors
    if (status === 400) {
      if (message?.toLowerCase().includes('validation')) {
        return 'All fields are required.';
      }
      if (message?.toLowerCase().includes('email')) {
        return 'Please enter a valid email address.';
      }
      if (message?.toLowerCase().includes('password')) {
        return 'Password must be at least 8 characters long.';
      }
      if (message?.toLowerCase().includes('name')) {
        return 'Please enter a valid name (at least 2 characters).';
      }
      if (message?.toLowerCase().includes('required')) {
        return 'Please fill in all required fields.';
      }
      return message || 'Invalid input. Please check your data and try again.';
    }

    // Not found errors
    if (status === 404) {
      if (message?.toLowerCase().includes('user')) {
        return 'User not found.';
      }
      return 'The requested resource was not found.';
    }

    // Forbidden/Access denied
    if (status === 403) {
      return 'You do not have permission to perform this action.';
    }

    // Server errors
    if (status >= 500) {
      return 'Server error. Please try again later.';
    }

    // Return backend message if available and meaningful
    if (message && message !== 'Error' && message.length < 150) {
      return message;
    }

    return 'An error occurred. Please try again.';
  }

  // Handle custom error messages
  if (error?.message) {
    const msg = error.message.toLowerCase();

    if (msg.includes('network')) {
      return 'Network error. Please check your connection and try again.';
    }

    if (msg.includes('timeout')) {
      return 'Request timed out. Please try again.';
    }

    return error.message;
  }

  // Fallback
  return 'Something went wrong. Please try again.';
};
