const { getDocument, saveDocument, removeDocument } = require('../../api/data');

const makeDocument = (timestamp, id) => ({
  data: [
    {
      docID: `id-${id}`,
      edited: false,
      title: 'Winning IRL - A battle against Sleepy Sam',
      author: 'Finn',
      likes: 2,
      body: `When I'm done with you... they'll call you stinky sam... stupid frog.`,
    },
  ],
  createdAt: timestamp,
});

describe('data', () => {
  describe('saveDocument', () => {
    let res;

    beforeEach(async () => {
      const timestamp = new Date();
      res = await saveDocument(makeDocument(timestamp, 'one'));
    });

    afterEach(async () => {
      const { id } = res;
      await removeDocument(id);
    });

    it('returns { error: false } on success', async () => {
      const { error } = res;
      const expectedError = false;
      expect(error).toEqual(expectedError);
    });
  });

  describe('getDocument', () => {
    let document1, document2, timestamp1, timestamp2;

    beforeEach(async () => {
      timestamp1 = new Date();
      document1 = await saveDocument(makeDocument(timestamp1, 'two'));

      timestamp2 = new Date();
      document2 = await saveDocument(makeDocument(timestamp2, 'three'));
    });

    afterEach(async () => {
      const { id: id1 } = document1;
      await removeDocument(id1);

      const { id: id2 } = document2;
      await removeDocument(id2);
    });

    it('returns the latest document without mongos record id with no args', async () => {
      const returnedDocument = await getDocument();
      const expectedDocument = makeDocument(timestamp2, 'three');
      expect(returnedDocument).toEqual(expectedDocument);
    });

    it('returns the document without mongos record id when document id is provided', async () => {
      const returnedDocument = await getDocument(document1.id);
      const expectedDocument = makeDocument(timestamp1, 'two');
      expect(returnedDocument).toEqual(expectedDocument);
    });
  });

  describe('removeDocument', () => {
    let res;

    beforeEach(async () => {
      const timestamp = new Date();
      res = await saveDocument(makeDocument(timestamp, 'four'));
    });

    it('removes document from database', async () => {
      const { id } = res;
      const document = await getDocument(id);
      expect(document.error).toBeFalsy();

      await removeDocument(id);
      const removedDocument = await getDocument(id);
      expect(removedDocument.error).toBeTruthy();
    });
  });
});
