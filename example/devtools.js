import Chaldeas from './../';

async function main() {
  const chaldeas = Chaldeas.new();

  try {
    const devtools = await chaldeas.getDevtoolsInterface();

    const page = await devtools.PageDomain();
    await page.navigate({ url: 'https://github.com/teitei-tk/Chaldeas' });

    page.domContentEventFired(async () => {
      const dom = await devtools.DOMDomain();
      const results = await dom.getFlattenedDocument();
      results.nodes.forEach((node) => {
        if (node.nodeName === 'BODY') {
          console.log(node);
        }
      });

      await chaldeas.terminate();
    });
  } catch (error) {
    await chaldeas.terminate();
    console.error(error);
  }
}

main();
