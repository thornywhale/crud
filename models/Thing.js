class Thing {
  static client = null;
  static tableName = "things";
  static attributes = {
    body: "string",
    updatedAt: "string",
    createdAt: "string",
  };

  static async create(values) {
    try {
      const insertedAttr = Object.entries(this.attributes)
        .filter(([attr]) => attr in values)
        .map(([attr]) => attr);
      const columns = insertedAttr.map((attr) => `"${attr}"`).join(",");
      console.log("---------------------------", columns);
      const insertingValues = insertedAttr
        .map((attr) => {
          const value = values[attr];
          const dataType = typeof this.attributes[attr];
          return dataType === "string" ? `'${value}'` : value;
        })
        .join(",");
      const { rows } = await this.client.query(`
      INSERT INTO ${this.tableName}(${columns}) VALUES
      (${insertingValues}) RETURNING *;
      `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async findAll() {
    try {
      const { rows } = await this.client.query(`
    SELECT *
    FROM ${this.tableName};
    `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async findByPk(pk) {
    try {
      const { rows } = await this.client.query(`
    SELECT *
    FROM ${this.tableName}
    WHERE "id"=${pk};
    `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async updateByPk(pk, values) {
    try {
      const insertedAttr = Object.entries(this.attributes)
        .filter(([attr]) => attr in values)
        .map(([attr]) => attr);
      let setRow = insertedAttr
        .map((attr) => {
          const value = values[attr];
          const dataType = typeof this.attributes[attr];
          const stringValue = dataType === "string" ? `'${value}'` : value;
          const stringPair = `"${attr}"=${stringValue}`;
          return stringPair;
        })
        .join(",");
      if ("updatedAt" in values) {
        console.log(values["updatedAt"]);
      } else {
        setRow += `,"updatedAt"='${new Date().toISOString()}'`;
      }
      const { rows } = await this.client.query(`
      UPDATE ${this.tableName}
      SET ${setRow}
      WHERE "id"=${pk}
      RETURNING *;
      `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
  static async deleteByPk(pk) {
    try {
      const rows = await this.client.query(`
    DELETE FROM ${this.tableName}
    WHERE "id"=${pk}
    RETURNING *;
    `);
      return rows;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = Thing;
