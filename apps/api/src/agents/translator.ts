import { Orchestrator } from '../core/orchestrator';

export class TranslatorAgent {
    constructor(private orchestrator: Orchestrator) { }

    translate(javaCode: string, fileName: string): { goCode: string, coverage: number } {
        let goCode = javaCode;
        let transformations = 0;
        const rules = [
            { name: 'Package', regex: /package\s+([\w.]+);/, replace: (m: any) => `package ${m[1].split('.').pop()}\n` },
            { name: 'Imports', regex: /import\s+[\w.]+;/g, replace: () => '' }, // Strip imports for now, add needed ones later or keep simple
            { name: 'Class', regex: /public\s+class\s+(\w+)\s*{/, replace: (m: any) => `type ${m[1]} struct {` },
            { name: 'FieldPrivate', regex: /private\s+([\w<>]+)\s+(\w+);/g, replace: (m: any) => `${this.capitalize(m[2])} ${this.mapType(m[1])}` },
            { name: 'Constructor', regex: /public\s+(\w+)\(([^)]*)\)\s*{/g, replace: (m: any) => `func New${m[1]}(${this.mapArgs(m[2])}) *${m[1]} {` },
            { name: 'MethodPublic', regex: /public\s+([\w<>]+)\s+(\w+)\(([^)]*)\)\s*{/g, replace: (m: any) => `func (s *${fileName.replace('.java', '')}) ${this.capitalize(m[2])}(${this.mapArgs(m[3])}) ${this.mapType(m[1])} {` },
            { name: 'Print', regex: /System\.out\.println\((.*)\);/g, replace: (m: any) => `fmt.Println(${m[1]})` },
            { name: 'This', regex: /this\./g, replace: () => '' }, // Simplified
        ];

        for (const rule of rules) {
            if (goCode.match(rule.regex)) {
                goCode = goCode.replace(rule.regex, rule.replace as any);
                transformations++;
            }
        }

        // Cleanup
        goCode = goCode.replace(/final\s+/g, '');

        // Add common imports if needed
        if (goCode.includes('fmt.')) {
            goCode = 'import "fmt"\n\n' + goCode;
        }

        return { goCode, coverage: transformations };
    }

    private mapType(javaType: string): string {
        const map: Record<string, string> = {
            'String': 'string',
            'int': 'int',
            'long': 'int64',
            'double': 'float64',
            'boolean': 'bool',
            'void': '',
            'List<String>': '[]string',
            'Map<String, Order>': 'map[string]Order'
        };
        return map[javaType] || javaType;
    }

    private mapArgs(args: string): string {
        if (!args) return '';
        return args.split(',').map(arg => {
            const [type, name] = arg.trim().split(/\s+/);
            return `${name} ${this.mapType(type)}`; // Go is name type
        }).join(', ');
    }

    private capitalize(s: string): string {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }
}
