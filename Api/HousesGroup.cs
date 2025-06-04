using Globomantics.Api.Models;
using Globomantics.Api.Repositories;

namespace Globomantics.Api;

public static class HousesEndpointGroup
{
    public static RouteGroupBuilder HousesGroup(this RouteGroupBuilder group)
    {
        group.MapGet("/", (HouseRepository repo) => repo.GetAll());
        group.MapGet("/{id:int}", (int id, HouseRepository repo) => repo.GetHouse(id));
        group.MapPost("/", (House house, HouseRepository repo) =>
        {
            repo.Add(house);
            return Results.Created($"/houses/{house.Id}", house);
        });

        group.MapGet("/{id:int}/bids", (int id, BidRepository repo) => repo.GetBids(id));
        group.MapPost("/{id:int}/bids", (Bid bid, BidRepository repo) =>
        {
            repo.Add(bid);
            return Results.Created($"/{bid.HouseId}/bids", bid);
        });
        
        return group;
    }
}