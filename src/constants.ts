export const DB_NAME: string = "social-media-platform";

export const nameless: string = "xyz";

export const NotificationPayload = (title: string, body: string) => {
	return {
		notification: {
			title,
			body,
		},
	};
};
