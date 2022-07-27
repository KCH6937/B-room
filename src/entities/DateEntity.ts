import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
