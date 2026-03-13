/**
 * Type definitions for the application
 */

export interface Tag {
  id: number;
  name: string;
  color: string;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  due_date?: string;  // ISO date string
  tags: Tag[];
}

export interface Column {
  key: string;
  title: string;
}

export type ColumnKey = "todo" | "inprogress" | "done";

export interface StatusMap {
  [itemId: number]: ColumnKey;
}

export interface TagCreateData {
  name: string;
  color: string;
}
