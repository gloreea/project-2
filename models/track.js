'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.track.belongsToMany(models.playlist, {
        through: "playlists_tracks"
      })
    }
  }
  track.init({
    track_name: DataTypes.STRING,
    track_artist: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'track',
  });
  return track;
};