import { Address, TonClient } from '@ton/ton';

export async function executeMethod(
  tonClient: TonClient,
  address: Address,
  method: string
) {

  let value = 0;

  try {
    const result = await tonClient.runMethod(address, method);

    const stackItem = result.stack.peek();

    if (stackItem.type === 'int') {
      value = parseInt(stackItem.value.toString(), 10);
    }
  } catch (error) {
    console.log('Methods error: ', error);
  }

  return value;
}
