import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable, Subject, tap } from 'rxjs';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messagesChanged = new Subject<Message[]>();

  messages: Message[] = [];
  private messagesUrl = 'https://mean-stack-48dee-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {
    this.getMessages().subscribe(
      (messages: Message[]) => {
        this.messages = messages;
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  setMessages(messages: Message[]) {
    this.messages = messages;
    this.messagesChanged.next(this.messages.slice());
  }


  getMessages(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl);
  }

  getMessageResolver(): Observable<Message[]> {
    return this.http.get<Message[]>(this.messagesUrl).pipe(
      map((messages: Message[]) => {
        return messages.map((message: Message) => {
          return {
            ...message,
          };
        });
      }),
      tap((messages: Message[]) => {
        this.messages = messages;
        this.messageChangedEvent.next(this.messages.slice());
      })
    );
  }
  getMessage(id: string): Message {
    for (const message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null!;
  }

  storeMessages() {
    const messages = this.messages.slice();
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.put(this.messagesUrl, messages, { headers: headers })
      .subscribe(
        () => {
          this.messageChangedEvent.next(messages.slice());
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.storeMessages();
  }


}