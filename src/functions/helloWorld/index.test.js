import {handler} from './index';
import { JestEnvironment } from '@jest/environment';

jest.mock("../../util/http/httpWrapper");


describe("Hello World Handler", () => {
    test("Says hello world", async () => {
        const result = await handler();
        expect(result).toBe("Hello World");
    })
})