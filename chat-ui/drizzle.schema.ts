import { pgTable, serial, text, jsonb, timestamp, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const abortedGenerations = pgTable("abortedGenerations", {
	id: serial("_id").primaryKey(),
	conversationId: jsonb("conversationId"),
	updatedAt: jsonb("updatedAt"),
});

export const assistantsStats = pgTable("assistants_stats", {
	id: serial("_id").primaryKey(),
	assistantId: jsonb("assistantId"),
	date: text("date"),
});

export const assistants = pgTable("assistants", {
	id: serial("_id").primaryKey(),
	createdById: jsonb("createdById"),
	featured: jsonb("featured"),
	last24HoursCount: jsonb("last24HoursCount"),
	modelId: jsonb("modelId"),
	searchTokens: jsonb("searchTokens"),
	userCount: jsonb("userCount"),
});

export const conversationsMessages = pgTable("ConversationsMessages", {
	ancestors: text("ancestors").array().notNull(),
	children: text("children").array().notNull(),
	content: text("content").notNull(),
	// createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull(),
	files: jsonb("files"),
	from: text("from").notNull(),
	id: text("id").primaryKey(),
	interrupted: boolean("interrupted").notNull(),
	// updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
	conversationsId: jsonb("conversationsId"),
});
export const conversationsStats = pgTable("conversations_stats", {
	id: serial("_id").primaryKey(),
	// date: timestamp("date", { mode: "date", precision: 3 }).notNull(),
	distinct: jsonb("distinct"),
	model: jsonb("model"),
});

export const conversations = pgTable("conversations", {
	id: serial("_id").primaryKey(),
	assistantId: text("assistantId").notNull(),
	// createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull(),
	embeddingModel: text("embeddingModel").notNull(),
	model: text("model").notNull(),
	preprompt: text("preprompt").notNull(),
	rootMessageId: text("rootMessageId").notNull(),
	sessionId: text("sessionId").notNull(),
	title: text("title").notNull(),
	// updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
	userAgent: text("userAgent").notNull(),
});

export const conversationsRelations = relations(conversations, (helpers) => ({
	messages: helpers.many(conversationsMessages, {
		relationName: "ConversationsMessagesToconversations",
	}),
}));

export const conversationsMessagesRelations = relations(conversationsMessages, (helpers) => ({
	conversations: helpers.one(conversations, {
		relationName: "ConversationsMessagesToconversations",
		fields: [conversationsMessages.conversationsId],
		references: [conversations.id],
	}),
}));
export const messageEvents = pgTable("messageEvents", {
	id: serial("_id").primaryKey(),
	createdAt: jsonb("createdAt"),
});

export const migrationResults = pgTable("migrationResults", {
	id: serial("_id").primaryKey(),
	name: text("name").notNull(),
	status: text("status").notNull(),
});

export const reports = pgTable("reports", {
	id: serial("_id").primaryKey(),
	assistantId: jsonb("assistantId"),
	createdBy: jsonb("createdBy"),
});
export const semaphores = pgTable("semaphores", {
	id: serial("_id").primaryKey(),
	createdAt: jsonb("createdAt"),
	key: jsonb("key"),
});

export const sessions = pgTable("sessions", {
	id: serial("_id").primaryKey(),
	expiresAt: jsonb("expiresAt"),
	sessionId: jsonb("sessionId"),
});

export const settings = pgTable("settings", {
	id: serial("_id").primaryKey(),
	activeModel: text("activeModel").notNull(),
	assistants: jsonb("assistants"),
	// createdAt: timestamp("createdAt", { mode: "date", precision: 3 }).notNull(),
	customPrompts: text("customPrompts").notNull(),
	// ethicsModalAcceptedAt: timestamp("ethicsModalAcceptedAt", {
	// 	mode: "date",
	// 	precision: 3,
	// }).notNull(),
	hideEmojiOnSidebar: boolean("hideEmojiOnSidebar").notNull(),
	sessionId: text("sessionId").notNull(),
	shareConversationsWithModelAuthors: boolean("shareConversationsWithModelAuthors").notNull(),
	// updatedAt: timestamp("updatedAt", { mode: "date", precision: 3 }).notNull(),
	userId: jsonb("userId"),
});

export const sharedConversations = pgTable("sharedConversations", {
	id: serial("_id").primaryKey(),
	hash: jsonb("hash"),
});
export const users = pgTable("users", {
	id: serial("_id").primaryKey(),
	hfUserId: jsonb("hfUserId"),
	sessionId: jsonb("sessionId"),
	username: jsonb("username"),
});

// export export const schema = {
// 	...conversationsMessages,
// 	...abortedGenerations,
// 	...assistants,
// 	...assistantsStats,
// 	...conversations,
// 	...conversationsStats,
// 	...messageEvents,
// 	...migrationResults,
// 	...reports,
// 	...semaphores,
// 	...sessions,
// 	...settings,
// 	...sharedConversations,
// 	...users,
// 	...conversationsMessagesRelations,
// 	...conversationsRelations,
// };
