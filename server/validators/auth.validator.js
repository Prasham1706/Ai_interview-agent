export const validateGoogleAuthPayload = ({ name, email } = {}) => {
    if (!name || typeof name !== "string" || !name.trim()) {
        return "Name is required"
    }

    if (!email || typeof email !== "string" || !email.trim()) {
        return "Email is required"
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email.trim())) {
        return "Valid email is required"
    }

    return null
}
