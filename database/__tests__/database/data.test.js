const { getDocument, saveDocument, removeDocument } = require('../../api/data');
const { isValidId, isValidDocument } = require('../../api/data');

const makeDocument = (timestamp, id) => ({
  data: {
    docID: `id-${id}`,
    edited: false,
    title: 'Winning IRL - A battle against Sleepy Sam',
    author: 'Finn',
    likes: 2,
    body: `When I'm done with you... they'll call you stinky sam... stupid frog.`,
  },
  createdAt: new Date(timestamp).toISOString(),
});

describe('data', () => {
  describe('saveDocument', () => {
    let res;

    beforeEach(async () => {
      const timestamp = new Date().toISOString();
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
      timestamp1 = new Date().toISOString();
      document1 = await saveDocument(makeDocument(timestamp1, 'two'));

      timestamp2 = new Date().toISOString();
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
      const stringifyDate = {
        ...returnedDocument,
        createdAt: `${returnedDocument.createdAt.toISOString()}`,
      };
      const expectedDocument = makeDocument(timestamp2, 'three');
      expect(stringifyDate).toEqual(expectedDocument);
    });

    it('returns the document without mongos record id when document id is provided', async () => {
      const returnedDocument = await getDocument(document1.id);
      const stringifyDate = {
        ...returnedDocument,
        createdAt: `${returnedDocument.createdAt.toISOString()}`,
      };
      const expectedDocument = makeDocument(timestamp1, 'two');
      expect(stringifyDate).toEqual(expectedDocument);
    });
  });

  describe('removeDocument', () => {
    let res;

    beforeEach(async () => {
      const timestamp = new Date().toISOString();
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

  describe('isValidId', () => {
    it('validates Mongo document Object Ids', () => {
      const invalidId = 'bleurgh';
      const validId = '53cb6b9b4f4ddef1ad47f943';

      expect(isValidId(invalidId)).toBeFalsy();
      expect(isValidId(validId)).toBeTruthy();
    });
  });

  describe('isValidDocument', () => {
    it('marks well formated documents as null', () => {
      const document = {
        data: {
          docID: `id-123`,
          edited: false,
          title: 'Winning IRL - A battle against Sleepy Sam',
          author: 'Finn',
          likes: 2,
          body: `When I'm done with you... they'll call you stinky sam... stupid frog.`,
        },
        createdAt: new Date().toISOString(),
      };

      const expectedResponse = true;
      const response = isValidDocument(document);
      expect(response).toEqual(expectedResponse);
    });

    it('marks mal formatted documents with an error', () => {
      // docId: is a number rather than string
      const document = {
        data: {
          docID: 123,
          edited: false,
          title: 'Winning IRL - A battle against Sleepy Sam',
          author: 'Finn',
          likes: 2,
          body: `When I'm done with you... they'll call you stinky sam... stupid frog.`,
        },
        createdAt: new Date().toISOString(),
      };

      const response = isValidDocument(document);
      const expectedResponse = '"docID" must be a string';
      expect(response).toEqual(expectedResponse);
    });

    it('marks documents with missing properties with an error', () => {
      // likes property is missing
      const document = {
        data: {
          docID: `id-123`,
          edited: false,
          title: 'Winning IRL - A battle against Sleepy Sam',
          author: 'Finn',
          body: `When I'm done with you... they'll call you stinky sam... stupid frog.`,
        },
        createdAt: new Date().toISOString(),
      };

      const response = isValidDocument(document);
      const expectedResponse = '"likes" is required';
      expect(response).toEqual(expectedResponse);
    });
  });
});
