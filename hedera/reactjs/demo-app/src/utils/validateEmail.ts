export const validateEmail = (email: string) => {
    const emailRegex = new RegExp(/(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}\])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))/);
    return emailRegex.test(email.toLowerCase());
};
