PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_habitt_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`date` integer NOT NULL,
	`completed` integer DEFAULT true,
	`habit_id` integer,
	`count` integer DEFAULT 1,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP),
	FOREIGN KEY (`habit_id`) REFERENCES `habits`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_habitt_logs`("id", "date", "completed", "habit_id", "count", "created_at") SELECT "id", "date", "completed", "habit_id", "count", "created_at" FROM `habitt_logs`;--> statement-breakpoint
DROP TABLE `habitt_logs`;--> statement-breakpoint
ALTER TABLE `__new_habitt_logs` RENAME TO `habitt_logs`;--> statement-breakpoint
PRAGMA foreign_keys=ON;