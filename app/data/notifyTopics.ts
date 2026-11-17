import type { Dictionary } from "@/i18n/dictionaries/en";

// What visitors can sign up for with a "Notify me" / newsletter form.
// The browser only sends one of these ids; the server looks up the name
// itself, so nobody can put their own text into our emails.

export const notifyTopics = ["news", "afya", "vikoba", "logistics", "remittance"] as const;
export type NotifyTopic = (typeof notifyTopics)[number];

/** Name of a topic in a language, e.g. "news" -> "Imara news". */
export function notifyTopicName(topic: NotifyTopic, t: Dictionary) {
  switch (topic) {
    case "news":
      return t.notify.newsTopic;
    case "afya":
      return "Afya Sync";
    default:
      return t.labs[topic].name;
  }
}
