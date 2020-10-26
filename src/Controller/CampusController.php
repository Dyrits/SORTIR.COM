<?php

namespace App\Controller;

use App\Entity\Campus;
use App\Repository\CampusRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/admin")
 */
class CampusController extends AbstractController
{
    private $repository;
    private $manager;

    public function __construct(EntityManagerInterface $manager, CampusRepository $repository)
    {
        $this->repository = $repository;
        $this->manager = $manager;
    }

    /**
     * @Route("/campus", name="campus_display")
     * @param Request $request
     * @return Response
     */
    public function display(Request $request) {
        return $this->render("campus/campus.html.twig");
    }

    /**
     * @Route("/campus/api", name="campus_list", methods={"GET"})
     * @param Request $request
     * @return Response
     */
    public function list(Request $request) {
        $nom = $request->get("nom");
        $campus = $this->repository->findByNomLike($nom);
        return $this->json($campus);
    }

    /**
     * @Route("/campus/api", name="campus_persist", methods={"POST"})
     * @param Request $request
     * @return Response
     */
    public function persist(Request $request) {
        $json = json_decode($request->getContent());
        $id = array_key_exists("id", $json) ? $id = $json->id : null;
        $nom = $json->nom;
        $campus = $id ? $this->repository->find($json->id) : new Campus();
        $campus->setNom($nom);
        $this->manager->persist($campus);
        $this->manager->flush();
        return $this->json($campus);
    }

    /**
     * @Route("/campus/api/{id}", name="campus_remove", requirements={"id": "\d+"}, methods={"DELETE"})
     * @param $id
     * @param Request $request
     * @return Response
     */
    public function remove($id, Request $request) {
        $ville = $this->repository->find($id);
        $this->manager->remove($ville);
        $this->manager->flush();
        return $this->json($ville);
    }
}
