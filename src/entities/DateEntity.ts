import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class DateEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'NULL',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    nullable: true
  })
  updatedAt: Date;
}
