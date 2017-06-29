import Chaldeas from './..';

async function main() {
  const chaldeas = Chaldeas.new();

  try {
    const protocol = await chaldeas.fetchProtocol();

    const { Page, Network, DOM } = protocol;
    await Promise.all([
      Page.enable(),
      Network.enable(),
      DOM.enable(),
    ]);

    await Page.navigate({ url: 'https://github.com' });
    await Page.loadEventFired(async () => {
      const node = await DOM.getDocument();
      console.log(node);

      await chaldeas.terminate();
    });
  } catch (error) {
    await chaldeas.terminate();
    console.error(error);
  }
}

main();
