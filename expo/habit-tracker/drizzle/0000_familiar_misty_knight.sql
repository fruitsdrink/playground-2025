CREATE TABLE `habitt_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer DEFAULT (CURRENT_TIMESTAMP),
	`completed` integer DEFAULT true,
	`habit_id` integer,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
--> statement-breakpoint
CREATE TABLE `habits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`color` text DEFAULT '#0099cc',
	`description` text DEFAULT '',
	`created_at` text DEFAULT (CURRENT_TIMESTAMP)
);
