export abstract class Repository<EntityT> {
    abstract async fetchById(id: string);
    abstract async persist(entity: EntityT);
}
