import Config from "./Config";
import { Client, Storage } from "appwrite";
import { ID } from "appwrite";
import { Account,Databases } from "appwrite";

 export const client = new Client()
client.setEndpoint("https://cloud.appwrite.io/v1").setProject("65da2395ec465b74322e")

export const account = new Account(client)

export const databases = new Databases()