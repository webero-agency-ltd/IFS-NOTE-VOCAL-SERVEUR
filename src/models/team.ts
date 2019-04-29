
import * as Sequelize from 'sequelize';
import { SequelizeAttributes } from '../interface/SequelizeAttributes';
import { InfusionsoftInstance , InfusionsoftAttributes } from './infusionsoft';
import { UserInstance , UserAttributes } from './user';
   
export interface TeamAttributes {
    id?: number;
    role?: string;
  	active?: boolean;
    createdAt?: Date;
  	updatedAt?: Date;
};

export interface TeamInstance extends Sequelize.Instance<TeamAttributes>, TeamAttributes {  

    getInfusionsoft: Sequelize.BelongsToGetAssociationMixin<InfusionsoftInstance>;
    setInfusionsoft: Sequelize.BelongsToSetAssociationMixin<InfusionsoftInstance, InfusionsoftInstance['id']>;
    createInfusionsoft: Sequelize.BelongsToCreateAssociationMixin<InfusionsoftAttributes,InfusionsoftInstance>;

    getUser: Sequelize.BelongsToGetAssociationMixin<UserInstance>;
    setUser: Sequelize.BelongsToSetAssociationMixin<UserInstance, UserInstance['id']>;
    createUser: Sequelize.BelongsToCreateAssociationMixin<UserAttributes,UserInstance>; 

    /*getUsersFromTeams: Sequelize.BelongsToManyGetAssociationsMixin<UserInstance>;
    setUsersFromTeams: Sequelize.BelongsToManySetAssociationsMixin<UserInstance, UserInstance['id'], 'UserTeams'>;
    addUsersFromTeams: Sequelize.BelongsToManyAddAssociationsMixin<UserInstance, UserInstance['id'], 'UserTeams'>;
    addUsersFromTeam: Sequelize.BelongsToManyAddAssociationMixin<UserInstance, UserInstance['id'], 'UserTeams'>;
    createUsersFromTeams: Sequelize.BelongsToManyCreateAssociationMixin<UserAttributes, UserInstance['id'], 'UserTeams'>;
    removeUsersFromTeam: Sequelize.BelongsToManyRemoveAssociationMixin<UserInstance, UserInstance['id']>;
    removeUsersFromTeams: Sequelize.BelongsToManyRemoveAssociationsMixin<UserInstance, UserInstance['id']>;
    hasUsersFromTeam: Sequelize.BelongsToManyHasAssociationMixin<UserInstance, UserInstance['id']>;
    hasUsersFromTeams: Sequelize.BelongsToManyHasAssociationsMixin<UserInstance, UserInstance['id']>;
    countUsersFromTeams: Sequelize.BelongsToManyCountAssociationsMixin;*/

}; 

export const TeamFactory = (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): Sequelize.Model<TeamInstance, TeamAttributes> => {
  	const attributes: SequelizeAttributes<TeamAttributes> = {
	    role: {
            type: DataTypes.STRING 
	    },
        active:{
	        type: DataTypes.BOOLEAN 
        }
  	};
  	const Team = sequelize.define<TeamInstance, TeamAttributes>('Team', attributes);
    Team.associate = models => {
        Team.belongsTo(models.Infusionsoft);
        //Infusionsoft.belongsTo(models.User, { as: 'author', foreignKey: 'AuthorId' });
        Team.belongsTo(models.User);
        /*Team.belongsToMany(models.User, {
            through: 'UserTeams',
            as: 'usersFromTeams'
        });*/
    };
  	return Team;
};