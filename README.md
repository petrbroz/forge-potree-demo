# forge-potree-demo

> Sample APS application showing the use of Potree pointclouds in the viewer.

![Screenshot](./screenshot.png)

## Usage

- clone the repository
- install Node.js dependencies: `yarn install`
- configure the following env. variables:
  - `APS_CLIENT_ID` - your APS application client ID
  - `APS_CLIENT_SECRET` - your APS application client secret
  - `APS_BUCKET` - APS bucket with designs to view
- run the serve: `yarn start`

When using Visual Studio Code, consider adding the following configuration to your _.vscode/launch.json_:

```json
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Server",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/server.js",
            "env": {
                "APS_CLIENT_ID": "<your APS application client ID>",
                "APS_CLIENT_SECRET": "<your APS application client secret>",
                "APS_BUCKET": "<your APS bucket>"
            }
        }
    ]
}
```

## Development

For more information about how the Potree data is loaded here, see [public/scripts/potree/README.md](./public/scripts/potree/README.md).