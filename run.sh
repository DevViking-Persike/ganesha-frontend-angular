#!/bin/bash
# Ganesha DesignLab — Angular
# Uso: ./run.sh [comando]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

show_help() {
    echo -e "${BLUE}Ganesha DesignLab — Angular${NC}"
    echo ""
    echo "Uso: ./run.sh [comando]"
    echo ""
    echo -e "${GREEN}Dev:${NC}"
    echo "  install      - pnpm install (angular/)"
    echo "  dev          - ng serve (http://localhost:4200)"
    echo "  check        - ng build (type-check + build)"
    echo ""
    echo -e "${GREEN}Build / Prod:${NC}"
    echo "  build        - ng build (gera angular/dist/)"
    echo "  preview      - serve estático do dist via python"
    echo ""
    echo -e "${GREEN}Docker:${NC}"
    echo "  docker-build - docker compose build"
    echo "  docker-up    - docker compose up -d"
    echo "  docker-down  - docker compose down"
    echo "  docker-logs  - docker compose logs -f web"
    echo ""
    echo -e "${GREEN}Limpeza:${NC}"
    echo "  clean        - remove node_modules/.angular/dist"
    echo ""
    echo -e "${YELLOW}Porta dev:${NC} http://localhost:4200"
}

case "${1:-help}" in
    install|i)
        pnpm --dir angular install
        ;;
    dev|all)
        pnpm --dir angular start
        ;;
    check|build)
        pnpm --dir angular build
        ;;
    preview)
        cd angular/dist/ganesha-designlab/browser && python3 -m http.server 8099
        ;;
    docker-build)
        docker compose build
        ;;
    docker-up|up)
        docker compose up -d
        ;;
    docker-down|down)
        docker compose down
        ;;
    docker-logs|logs)
        docker compose logs -f web
        ;;
    clean)
        rm -rf angular/node_modules angular/.angular angular/dist
        echo "Limpeza concluída."
        ;;
    help|-h|--help|*)
        show_help
        ;;
esac
