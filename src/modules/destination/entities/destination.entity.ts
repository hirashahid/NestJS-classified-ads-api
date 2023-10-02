import { Column, Entity, ObjectId, ObjectIdColumn } from 'typeorm';

@Entity()
export class Destination {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ default: false })
  visited: boolean;
}
