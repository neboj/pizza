module.exports = {
  prepareCacheDocs: async (schema, cacheProperty) => {
    try {
      const docs = await schema.find();
      state.cache[cacheProperty] = docs;
      return docs;
    } catch (err) {
      console.log("Prepare cache err");
      throw err;
    }
  },
};
