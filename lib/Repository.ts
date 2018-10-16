export abstract class Repository<EntityT> {
    abstract async fetchById(id: string): Promise<EntityT | undefined>;
    abstract async persist(entity: EntityT): Promise<void>;
}
