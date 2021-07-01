const getRecipientEmail = (users, currentUser) => {
    return users?.filter(emailToCheck => emailToCheck !== currentUser.email)[0];
}

export default getRecipientEmail;